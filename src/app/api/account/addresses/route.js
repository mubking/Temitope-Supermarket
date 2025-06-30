// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions"; // ✅ CORRECT IMPORT
// import { connectToDB } from "@/utils/db";
// import Address from "@/models/Address";
import { NextResponse } from "next/server";


export async function GET() {

  return NextResponse.json({ message: "hello" });
}