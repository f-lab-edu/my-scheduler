"use client";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { LogInFormType } from "@/types/loginType";
import { LoginAction } from "./actions/LoginAction";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<LogInFormType>();
  const [formState, formAction] = useActionState<LogInFormType, FormData>(
    LoginAction,
    {
      success: false,
      message: "",
    }
  );

  return (
    <form action={formAction}>
      <input
        {...register("email", { required: "email을 입력해주세요" })}
        placeholder="First name"
      />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
