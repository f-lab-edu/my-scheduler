"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginAction } from "@/app/auth/actions/LoginAction";
import SubmitButton from "@/components/common/button/SubmitButton";
import { LogInFormType } from "@/types/authType";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { FirebaseError } from "firebase/app";

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
      });

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
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            setError("password", {
              type: "manual",
              message: "이메일 또는 비밀번호가 일치하지 않습니다.",
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
      <div className="flex flex-col align-center rounded-lg mb-6">
        <label className="mb-3" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="p-[20px] border border-border-lightGray rounded-lg"
          {...register("email", {
            required: "email을 입력하세요",
            // TODO: email validate 처리
            // validate: (value) => {
            //   return (
            //     validator.isEmail(value || "") ||
            //     "이메일 형식이 올바르지 않습니다."
            //   );
            // },
          })}
          placeholder="email"
        />
        {errors.email && (
          <span className="text-red-50">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col align-center rounded-lg mb-6">
        <label className="mb-3" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="p-[20px] border border-border-lightGray rounded-lg"
          {...register("password", {
            required: "Password를 입력하세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8글자 이상이어야 합니다.",
            },
          })}
          placeholder="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

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
