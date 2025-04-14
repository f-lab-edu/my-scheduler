"use server";
import { LogInFormType } from "@/types/loginType";

export async function LoginAction(
  state: LogInFormType,
  payload: FormData
): Promise<LogInFormType> {
  // const loginInfo = {};
  const email = payload.get("email")?.toString() || "";
  const password = payload.get("password")?.toString() || "";

  if (!email) {
    return {
      success: false,
      message: "email는 필수입니다.",
      fieldErrors: {
        email: "이메일은 필수입니다.",
      },
    };
  } else if (!password) {
    return {
      success: false,
      message: "password는 필수입니다.",
    };
  }

  return {
    success: true,
    message: "로그인 성공!!",
    // loginInfo,
  };
}
