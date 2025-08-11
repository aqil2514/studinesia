import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query");

  try {
    const { data } = await axios.get(
      `${serverEndpoint}/articles?query=${query}`
    );
    return NextResponse.json({ data: data.articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "OK" });
  }
}
