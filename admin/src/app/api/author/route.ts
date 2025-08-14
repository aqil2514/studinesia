import { Author } from "@/@types/author";
import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get(`${serverEndpoint}/author`);

    return NextResponse.json({ authors: data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const body: Author = await req.json();

  try {
    await axios.post(`${serverEndpoint}/author`, body);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return NextResponse.json({ message: "OK" });
}
