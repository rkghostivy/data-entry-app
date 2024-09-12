import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Weather from "@/models/weather"; 
import { connectSQL } from "@/lib/db"; 

export async function GET() {
  try {
    
    const mysqlConnection = await connectSQL();
    
    const [data] = await mysqlConnection.execute('SELECT * FROM weather');

    await mysqlConnection.end();
    
    await connectMongoDB();
    
    const insertedData = await Weather.insertMany(data);
    
    return NextResponse.json(insertedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching and storing weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch and store weather data" },
      { status: 500 }
    );
  }
}
