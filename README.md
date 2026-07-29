# Cashew Capital

A demo web app for a fictitious AI-powered consumer lending platform. Built for sales engineering demos — not a real financial product.

**Cashew Capital** offers personal loans, debt consolidation, and credit building. **Cashew Advisor** is an AI chatbot that handles loan pre-qualification, repayment planning, and credit counseling — fully automated, no human in the loop.

## Architecture

| Service  | Stack                          | Port |
|----------|--------------------------------|------|
| Frontend | Next.js, TypeScript, Tailwind  | 3000 |
| Backend  | Node.js, Express, TypeScript   | 3001 |

The backend currently uses keyword-matched mock responses with artificial latency (300–1500ms) to simulate an LLM call. The chat service is structured so you can swap in a real Bedrock call later.

## Quick Start (Docker)

The fastest way to run everything:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

## Local Development

Run the backend and frontend in separate terminals.

**Terminal 1 — Backend**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend talks to the backend at `http://localhost:3001` by default.

## API Endpoints

### `GET /health`

Health check.

```bash
curl http://localhost:3001/health
```

### `POST /api/chat`

Accepts a conversation and returns a mock AI response.

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"I want to borrow $10,000"}]}'
```

### `POST /api/prequalify`

Returns a mock pre-qualification decision with a repayment plan estimate.

```bash
curl -X POST http://localhost:3001/api/prequalify \
  -H "Content-Type: application/json" \
  -d '{"income":75000,"requestedAmount":15000,"employmentStatus":"employed"}'
```

## Project Structure

```
cashew-capital/
├── frontend/
│   ├── src/app/              # Pages (landing, /advisor chat)
│   ├── src/components/       # UI components
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── services/         # Chat logic (mock LLM — swap for Bedrock here)
│   │   └── index.ts          # Express app entry point
│   └── Dockerfile
└── docker-compose.yml
```

## Swapping the Mock LLM for Bedrock

The mock response logic lives in `backend/src/services/chatService.ts`. Replace the body of `generateChatResponse()` with a Bedrock API call — the route handler in `backend/src/routes/chat.ts` doesn't need to change.

## Pages

| Route      | Description                                      |
|------------|--------------------------------------------------|
| `/`        | Landing page — hero, how it works, product cards |
| `/advisor` | Chat interface for Cashew Advisor                |

## Disclaimer

This is a demo application for sales engineering purposes. It is not affiliated with any real financial institution and does not process real loans or financial data.
