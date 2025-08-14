import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await axios.post(`${serverEndpoint}/category`, body);

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
