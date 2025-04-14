"use client";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LogInFormType } from "@/types/loginType";
import { LoginAction } from "../../actions/LoginAction";
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

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: LogInFormType) => {
    if (data.email && data.password) await login(data.email, data.password);
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
          <span className="text-red-50">{errors.password.message}</span>
        )}
      </div>

      {serverState.message && (
        <p className={serverState.success ? "text-green-500" : "text-red-500"}>
          {serverState.message}
        </p>
      )}

      <SubmitButton text="Login" type="submit" />
    </form>
  );
}
