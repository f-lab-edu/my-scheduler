import { notFound } from "next/navigation";
import LoginForm from "@/app/login/[auth]/login/LoginForm";
import RegisterForm from "@/app/login/[auth]/register/RegisterForm";
interface PageProps {
  params: Promise<{ auth?: string }>;
}

export default async function AuthPage({ params }: PageProps) {
  const { auth } = await params;

  if (auth === "login") {
    return <LoginForm />;
  } else if (auth === "register") {
    return <RegisterForm />;
  } else {
    notFound();
  }
}
