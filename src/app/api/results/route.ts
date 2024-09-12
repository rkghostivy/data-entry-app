import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, connectSQL } from "@/lib/db";
import Weather from "@/models/weather";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

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
export async function POST(request: NextRequest) {
  try {
    const connection = await connectSQL();

    const weatherData = await request.json();

    const { id, name, max, min, average, timestamp } = weatherData;

    const query = `
      INSERT INTO weather (id, name, max, min, average, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(query, [id, name, max, min, average, timestamp]);

    await connection.end();

    return NextResponse.json(weatherData, { status: 201 });
  } catch (error) {
    console.error("Error creating weather data in MySQL:", error);
    return NextResponse.json(
      { error: "Failed to create weather data in MySQL" },
      { status: 500 }
    );
  }
}