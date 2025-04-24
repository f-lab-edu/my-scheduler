import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import "@/lib/firebase";

export async function POST(request: Request) {
  const { email, password, name, mobile } = await request.json();

  if (!email) {
    return NextResponse.json({
      success: false,
      message: "email은 필수입니다.",
    });
  }
  if (!password) {
    return NextResponse.json({
      success: false,
      message: "password는 필수입니다.",
    });
  }
  if (!name) {
    return NextResponse.json({ success: false, message: "name은 필수입니다." });
  }
  if (!mobile) {
    return NextResponse.json({
      success: false,
      message: "mobile은 필수입니다.",
    });
  }

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name,
    });

    await getFirestore().collection("users").doc(userRecord.uid).set({
      email,
      name,
      mobile,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "회원가입 성공!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "회원가입에 실패했습니다.",
    });
  }
}
