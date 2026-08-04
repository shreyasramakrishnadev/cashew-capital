import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${request.method} ${request.nextUrl.pathname}`
  );

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Log page navigations only — skip static assets and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|map)$).*)",
  ],
};
