"use client";
import { useEffect, useTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterAction } from "@/app/auth/actions/RegisterAction";
import SubmitButton from "@/components/common/button/SubmitButton";
import { RegisterFormType, RegisterResponse } from "@/types/authType";
import AuthInput from "@/components/common/AuthInput";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const [serverState, formAction] = useActionState<
    RegisterResponse,
    RegisterFormType
  >(RegisterAction, { success: false, message: "" });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (serverState.success) {
      router.push("/auth/login");
    }
  }, [serverState.success, router]);

  const onSubmit = (data: RegisterFormType) => {
    startTransition(() => {
      formAction(data);
    });
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

      <SubmitButton text="Register" type="submit" disabled={isPending} />
      {serverState.message && (
        <p className={serverState.success ? "text-green-500" : "text-red-500"}>
          {serverState.message}
        </p>
      )}
    </form>
  );
}
