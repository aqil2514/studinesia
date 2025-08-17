import { auth } from "@/auth";
import { serverEndpoint } from "@/config/server-endpoint";
import { ErrorMessages } from "@/utils/errors-http";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();

  try {
    const { data } = await axios.post(`${serverEndpoint}/category`, body, {
      headers: {
        Authorization: `Bearer ${session?.supabaseAccessToken}`,
      },
    });

    if (!data.success) {
      return NextResponse.json({ message: data.message }, { status: 400 });
    }

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const status = error.status as number;

      return NextResponse.json({ message: ErrorMessages[status] }, { status });
    }
    throw error;
  }
}
