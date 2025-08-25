import { BasicResponse } from "@/@types/http-response";
import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type PostResponse = Promise<NextResponse<BasicResponse>>;
export async function POST(req: NextRequest): PostResponse {
  const body = await req.json();

  try {
    const { data } = await axios.post(
      `${serverEndpoint}/newsletter/subscribe`,
      body
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server", success: false },
      { status: 500 }
    );
  }
}
