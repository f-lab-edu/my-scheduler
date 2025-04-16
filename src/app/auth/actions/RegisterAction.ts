"use server";
import { getAuth } from "firebase-admin/auth";
import { RegisterFormType, RegisterResponse } from "@/types/authType";
import { getFirestore } from "firebase-admin/firestore";
import "@/lib/firebase";

export async function RegisterAction(
  state: RegisterResponse,
  data: RegisterFormType
): Promise<RegisterResponse> {
  const { email, password, name, mobile } = data;

  if (!email) {
    return {
      success: false,
      message: "email은 필수입니다.",
    };
  } else if (!password) {
    return { success: false, message: "password는 필수입니다." };
  } else if (!name) {
    return { success: false, message: "name은 필수입니다." };
  } else if (!mobile) {
    return { success: false, message: "mobile은 필수입니다." };
  }

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name,
    });

    const db = getFirestore();
    await db.collection("users").doc(userRecord.uid).set({
      email,
      name,
      mobile, // 010 형식으로 저장
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "회원가입 성공!!",
    };
  } catch (error) {
    console.error("회원가입 에러", error);
    return {
      success: false,
      message: "회원가입에 실패했습니다. 입력 정보를 확인해주세요.",
    };
  }
}
