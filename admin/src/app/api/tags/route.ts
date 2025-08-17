import { auth } from "@/auth";
import { serverEndpoint } from "@/config/server-endpoint";
import { ErrorMessages } from "@/utils/errors-http";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  const body = await req.json();
  try {
    await axios.post(`${serverEndpoint}/tags`, body, {
      headers: {
        Authorization: `Bearer ${session?.supabaseAccessToken}`,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const status = error.status as number;

      return NextResponse.json(
        { message: ErrorMessages[status] || "Terjadi kesalahan" },
        { status: error.status }
      );
    }
  }
}
