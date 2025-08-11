import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data } = await axios.post(`${serverEndpoint}/gemini/article`, body);

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "OK" });
}
