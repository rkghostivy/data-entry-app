import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import { connectSQL } from "@/lib/db"; 
import { queryUser } from "@/lib/userQueries"; 

export async function POST(request: NextRequest) {
    try {
        const { name, password } = await request.json();

        const connection = await connectSQL();
        const user = await queryUser(connection, name);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const match = (password === user.password); 

        if (!match) {
            return NextResponse.json({ success: false, message: "Invalid password" });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set('auth-token', '13xd13ed13ce1fgsnyr75e', { httpOnly: true });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred" });
    }
}
