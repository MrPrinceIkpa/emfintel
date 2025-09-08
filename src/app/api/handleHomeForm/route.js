import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ObjtoPDF } from "../../../../lib/pdfUtil";
import { sendEmail } from "../../../../lib/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const { address, dwellingType, mainGoal, email} = body;

    if (!address || !email || !dwellingType || !mainGoal) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    var pdfBase64= ObjtoPDF(body);
    const realPdf = await pdfBase64;

    const docRef = await addDoc(collection(db, "potentialClients"), {
      address,
      dwellingType,
      mainGoal,
      email,
      createdAt: serverTimestamp(),
    });

    sendEmail(email, realPdf);

    return NextResponse.json({ success: true, id: docRef.id, pdf: pdfBase64});
  } catch (err) {
    console.log(err);
    return NextResponse.json({error: `"Failed to save data". Details: ${err}`}, {status: 500});
  }
}