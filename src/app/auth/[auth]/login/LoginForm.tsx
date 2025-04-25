"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebaseClient";
import { LoginAction } from "@/app/auth/actions/LoginAction";
import SubmitButton from "@/components/common/button/SubmitButton";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AuthInput from "@/components/common/AuthInput";
import { LogInFormType } from "@/types/authType";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverState, formAction] = useActionState<LogInFormType, FormData>(
    LoginAction,
    {
      success: false,
      message: "",
    }
  );

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        credentials: "include",
        redirect: "manual",
      });
      console.log("🟪🟪🟪", response);
      if (response.ok && response.redirected) router.push(response.url);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("email", {
              type: "manual",
              message: "유효하지 않은 이메일 형식입니다.",
            });
            break;
          case "auth/invalid-credential":
            setError("password", {
              type: "manual",
              message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
            break;
          case "auth/network-request-failed":
            setError("password", {
              type: "manual",
              message: "네트워크 오류입니다.",
            });
            break;
          case "auth/internal-error":
            setError("password", {
              type: "manual",
              message: "서버 내부 오류입니다.",
            });
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: LogInFormType) => {
    if (data.email && data.password)
      await loginWithEmail(data.email, data.password);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        name="email"
        label="Email"
        type="email"
        placeholder="email"
        register={register("email", { required: "이메일은 필수입니다." })}
        error={errors.email?.message as string}
      />

      <AuthInput
        name="password"
        label="Password"
        type="password"
        placeholder="password"
        register={register("password", { required: "비밀번호는 필수입니다." })}
        error={errors.password?.message as string}
      />

      {serverState.message && (
        <p className={serverState.success ? "text-green-500" : "text-red-500"}>
          {serverState.message}
        </p>
      )}

      <SubmitButton text="Login" type="submit" />
      {isLoading && <LoadingSpinner />}
    </form>
  );
}
