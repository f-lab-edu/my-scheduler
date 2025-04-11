"use client";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { LogInFormType } from "@/types/loginType";
import { LoginAction } from "./actions/LoginAction";
import SubmitButton from "@/components/common/button/SubmitButton";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [serverState, formAction] = useActionState<LogInFormType, FormData>(
    LoginAction,
    {
      success: false,
      message: "",
    }
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        handleSubmit(() => {
          formElement.submit();
        })();
      }}
    >
      <div className="flex flex-col align-center rounded-lg mb-6">
        <label className="mb-3" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="p-[20px] border border-border-lightGray rounded-lg"
          {...register("email", {
            required: "email을 입력하세요",
            validate: (value) => {
              return (
                validator.isEmail(value || "") ||
                "이메일 형식이 올바르지 않습니다."
              );
            },
          })}
          placeholder="email"
        />
        {errors.email && <span>{errors.email.message}</span>}
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
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {serverState.message && (
        <p className={serverState.success ? "text-green-500" : "text-red-500"}>
          {serverState.message}
        </p>
      )}

      <SubmitButton onClick={() => {}} text="Login" />
    </form>
  );
}
