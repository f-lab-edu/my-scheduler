import { notFound } from "next/navigation";
import LoginForm from "@/app/auth/[auth]/login/LoginForm";
import RegisterForm from "@/app/auth/[auth]/register/RegisterForm";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ auth: string }>;
}) {
  const { auth } = await params;

  if (auth === "login") {
    return <LoginForm />;
  } else if (auth === "register") {
    return <RegisterForm />;
  } else {
    notFound();
  }
}
