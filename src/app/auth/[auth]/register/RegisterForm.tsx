"use client";
import { useEffect, useTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterAction } from "@/app/auth/actions/RegisterAction";
import SubmitButton from "@/components/common/button/SubmitButton";
import { RegisterFormType, RegisterResponse } from "@/types/authType";

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
      <div className="flex flex-col align-center rounded-lg mb-6">
        <label className="mb-3" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="p-[20px] border border-border-lightGray rounded-lg"
          {...register("name", {
            required: "이름을 입력하세요",
          })}
          placeholder="name"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

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
          })}
          placeholder="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
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

      <div className="flex flex-col align-center rounded-lg mb-6">
        <label className="mb-3" htmlFor="mobile">
          Mobile
        </label>
        <input
          id="mobile"
          className="p-[20px] border border-border-lightGray rounded-lg"
          {...register("mobile", {
            required: "핸드폰 번호를 입력하세요",
          })}
          placeholder="mobile"
        />
        {errors.mobile && (
          <span className="text-red-500">{errors.mobile.message}</span>
        )}
      </div>

      <SubmitButton text="Register" type="submit" disabled={isPending} />
      {serverState.message && (
        <p className={serverState.success ? "text-green-500" : "text-red-500"}>
          {serverState.message}
        </p>
      )}
    </form>
  );
}
