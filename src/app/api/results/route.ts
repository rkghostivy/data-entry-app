import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Weather from "@/app/models/weather";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    // Example query - adjust based on your schema
    const data = await Weather.find();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
