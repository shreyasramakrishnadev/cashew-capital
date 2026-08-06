import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { readFileSync } from "fs";
import { join } from "path";

const REGION = "us-east-1";
const EMBEDDING_MODEL_ID = "amazon.titan-embed-text-v2:0";
const client = new BedrockRuntimeClient({ region: REGION });

interface KnowledgeChunk {
  source: string;
  heading: string;
  text: string;
  embedding: number[];
}

// Loaded once at startup — small enough (a handful of KB chunks) that
// keeping it in memory is simpler and faster than a real vector database.
let knowledgeBase: KnowledgeChunk[] = [];

export function loadKnowledgeBase(): void {
  const path = join(__dirname, "../data/embeddings.json");
  const raw = readFileSync(path, "utf-8");
  knowledgeBase = JSON.parse(raw);
  console.log(`RAG: loaded ${knowledgeBase.length} knowledge base chunks`);
}

async function embedQuery(query: string): Promise<number[]> {
  const command = new InvokeModelCommand({
    modelId: EMBEDDING_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({ inputText: query }),
  });
  const response = await client.send(command);
  const raw = new TextDecoder().decode(response.body);
  const parsed = JSON.parse(raw);
  return parsed.embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Returns the top-K most relevant knowledge base chunks for a given
 * user query, along with their similarity scores.
 */
export async function retrieveRelevantChunks(
  query: string,
  topK: number = 3
): Promise<{ text: string; source: string; score: number }[]> {
  if (knowledgeBase.length === 0) {
    console.warn("RAG: knowledge base not loaded — call loadKnowledgeBase() at startup");
    return [];
  }

  try {
    const queryEmbedding = await embedQuery(query);
    const scored = knowledgeBase.map((chunk) => ({
      text: chunk.text,
      source: chunk.source,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  } catch (error) {
    console.error("RAG: retrieval failed, falling back to no context", error);
    return [];
  }
}
