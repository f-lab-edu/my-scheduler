import { notFound, redirect } from "next/navigation";
import LoginForm from "@/app/auth/[auth]/login/LoginForm";
import RegisterForm from "@/app/auth/[auth]/register/RegisterForm";
import { getSessionUid } from "@/lib/server/auth";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ auth: string }>;
}) {
  const { auth } = await params;

  const uid = await getSessionUid();
  if (uid) redirect(`/mypage/${uid}`);

  if (auth === "login") {
    return <LoginForm />;
  } else if (auth === "register") {
    return <RegisterForm />;
  } else {
    notFound();
  }
}
