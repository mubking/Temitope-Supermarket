export async function POST(req) {
  const { idType, idNumber } = await req.json();

  if (!idNumber || idNumber.length < 10) {
    return new Response(
      JSON.stringify({ verified: false, message: "Invalid ID number" }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      verified: true,
      data: {
        firstName: "Temitope",
        lastName: "Mubarak",
        gender: "Male",
        dob: "1995-05-12",
        idType,
        idNumber
      }
    }),
    { status: 200 }
  );
}
