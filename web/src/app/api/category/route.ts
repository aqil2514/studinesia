import { serverEndpoint } from "@/config/serverEndpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const limit = searchParams.get("limit");
  const slug = searchParams.get("slug");

  try {
    const { data } = await axios.get(`${serverEndpoint}/category`, {
      params: {
        limit,
        slug,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
