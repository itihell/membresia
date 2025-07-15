import { auth } from "@/auth.config";

import {  NextResponse } from "next/server";
//request: NextRequest
export async function GET() {
  const session = await auth();
  return NextResponse.json(session);
}
