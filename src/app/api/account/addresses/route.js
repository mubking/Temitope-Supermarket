// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions"; // ✅ CORRECT IMPORT
// import { connectToDB } from "@/utils/db";
// import Address from "@/models/Address";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   const session = await getServerSession(req, authOptions);
//   if (!session?.user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   await connectToDB();
//   const addresses = await Address.find({ userId: session.user.id });
//   return NextResponse.json({ addresses });
// }

// export async function POST(req) {
//   const session = await getServerSession(req, authOptions);
//   if (!session?.user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { fullName, phone, address, city, note } = body;

//   if (!fullName || !phone || !address || !city) {
//     return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
//   }

//   await connectToDB();

//   const newAddress = await Address.create({
//     userId: session.user.id,
//     fullName,
//     phone,
//     address,
//     city,
//     note,
//   });

//   return NextResponse.json({ message: "Address saved", address: newAddress });
// }

// export async function PATCH(req) {
//   const session = await getServerSession(req, authOptions);
//   if (!session?.user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const { id, fullName, phone, address, city, note } = await req.json();

//   if (!id || !fullName || !phone || !address || !city) {
//     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//   }

//   await connectToDB();

//   const updated = await Address.findOneAndUpdate(
//     { _id: id, userId: session.user.id },
//     { fullName, phone, address, city, note },
//     { new: true }
//   );

//   if (!updated) return NextResponse.json({ error: "Address not found" }, { status: 404 });

//   return NextResponse.json({ message: "Address updated", address: updated });
// }

// export async function DELETE(req) {
//   const session = await getServerSession(req, authOptions);
//   if (!session?.user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const { id } = await req.json();
//   if (!id) {
//     return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
//   }

//   await connectToDB();
//   await Address.deleteOne({ _id: id, userId: session.user.id });

//   return NextResponse.json({ message: "Address deleted" });
// }



export async function GET() {

  return NextResponse.json({ message: "hello" });
}