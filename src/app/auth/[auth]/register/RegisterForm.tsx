"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/common/button/SubmitButton";
import { RegisterFormType, RegisterResponse } from "@/types/authType";
import AuthInput from "@/components/common/AuthInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";


export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterFormType) => {
    setServerMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await response.json()) as RegisterResponse;
      if (!json.success) {
        if (json.message.includes("email")) {
          setError("email", { type: "manual", message: json.message });
        } else if (json.message.includes("password")) {
          setError("password", { type: "manual", message: json.message });
        } else {
          setServerMessage(json.message);
        }
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      setServerMessage("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        name="name"
        label="Name"
        register={register("name", { required: "이름을 입력하세요" })}
        error={errors.name?.message as string}
      />

      <AuthInput
        name="email"
        label="Email"
        type="email"
        register={register("email", { required: "email을 입력하세요" })}
        error={errors.email?.message as string}
      />

      <AuthInput
        name="password"
        label="Password"
        type="password"
        register={register("password", {
          required: "Password를 입력하세요",
          minLength: {
            value: 8,
            message: "비밀번호는 8글자 이상이어야 합니다.",
          },
        })}
        error={errors.password?.message as string}
      />

      <AuthInput
        name="mobile"
        label="Mobile"
        register={register("mobile", { required: "핸드폰 번호를 입력하세요" })}
        error={errors.mobile?.message as string}
      />

      <SubmitButton text="Register" type="submit" />
      {serverMessage && <p className="text-red-500">{serverMessage}</p>}
      {isLoading && <LoadingSpinner />}
    </form>
  );
}
