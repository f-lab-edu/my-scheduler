import { notFound } from "next/navigation";
import LoginForm from "@/app/login/[loginRegister]/login/LoginForm";
import RegisterForm from "@/app/login/[loginRegister]/register/RegisterForm";
interface Props {
  params: Promise<{ tab?: string }>;
}

export default async function LoginRegisterPage({ params }: Props) {
  const { tab } = await params;

  if (tab === "login") {
    return <LoginForm />;
  } else if (tab === "register") {
    return <RegisterForm />;
  } else {
    notFound();
  }
}
