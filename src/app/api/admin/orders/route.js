// src/app/api/admin/orders/route.js
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const isAdmin = await req.headers.get("isAdmin"); 
    await connectToDB();
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, {
        status: 403,
      });
    }
 
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ orders }, {
      status: 200
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500}
    );
  }
}
