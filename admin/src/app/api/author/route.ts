import { Author } from "@/@types/author";
import { auth } from "@/auth";
import { serverEndpoint } from "@/config/server-endpoint";
import { ErrorMessages } from "@/utils/errors-http";
import axios, { isAxiosError } from "axios";
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
  const session = await auth();

  try {
    await axios.post(`${serverEndpoint}/author`, body, {
      headers: {
        Authorization: `Bearer ${session?.supabaseAccessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const status = error.status as number;

      return NextResponse.json({ message: ErrorMessages[status] }, { status });
    }
    throw error;
  }

  return NextResponse.json({ message: "OK" });
}
