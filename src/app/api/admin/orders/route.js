// src/app/api/admin/orders/route.js
import { connectToDB } from "@/utils/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, {
        status: 403,
      });
    }

    // const orders = await Order.find()
    //   .sort({ createdAt: -1 })
    //   .populate("userId", "email firstName lastName");
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
