import { NextResponse } from "next/server";
export function middleware(request) {
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=30")
    return response
}

export const config = {
    matcher : "/:path*"
}