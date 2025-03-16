import { NextResponse } from "next/server";
import preachers from "../../data/preachers.json"

export async function GET() {
  return NextResponse.json(preachers);
}
