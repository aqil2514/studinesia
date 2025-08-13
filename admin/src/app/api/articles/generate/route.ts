import { serverEndpoint } from "@/config/server-endpoint";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description } = body;

  if (!title)
    return NextResponse.json(
      { message: "Judul artikel belum ditentukan!" },
      { status: 400 }
    );

  if (!description)
    return NextResponse.json(
      { message: "Deskripsi artikel belum ditentukan!" },
      { status: 400 }
    );

  try {
    const { data } = await axios.post(`${serverEndpoint}/gemini/article`, body);

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "OK" });
}
