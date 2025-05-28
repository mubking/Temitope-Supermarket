// File: src/app/api/admin/upload/route.js
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert buffer to readable stream
function bufferToStream(buffer) {
  return Readable.from(buffer);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "temitope-products" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result.secure_url }));
          }
        }
      );

      bufferToStream(buffer).pipe(uploadStream);
    });

  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
