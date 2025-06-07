import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/utils/db";
import Address from "@/models/Address";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectToDB();
  const addresses = await Address.find({ userId: session.user.id });
  return Response.json({ addresses });
}
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { fullName, phone, address, city, note } = body;

  if (!fullName || !phone || !address || !city) {
    return Response.json({ error: "All required fields must be filled" }, { status: 400 });
  }

  await connectToDB();

  const newAddress = await Address.create({
    userId: session.user.id,
    fullName,
    phone,
    address,
    city,
    note,
  });

  return Response.json({ message: "Address saved", address: newAddress });
}
export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, fullName, phone, address, city, note } = await req.json();

  if (!id || !fullName || !phone || !address || !city) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectToDB();

  const updated = await Address.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    { fullName, phone, address, city, note },
    { new: true }
  );

  if (!updated) return Response.json({ error: "Address not found" }, { status: 404 });

  return Response.json({ message: "Address updated", address: updated });
}
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return Response.json({ error: "Address ID is required" }, { status: 400 });
  }

  await connectToDB();
  await Address.deleteOne({ _id: id, userId: session.user.id });

  return Response.json({ message: "Address deleted" });
}
