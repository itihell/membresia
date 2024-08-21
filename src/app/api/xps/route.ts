import { auth } from "@/auth.config";

import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const session = await auth();
  return NextResponse.json(session);
}
