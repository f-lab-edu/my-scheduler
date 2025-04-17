import LoginForm from "./[auth]/login/LoginForm";

export default function Page() {
  return (
    <div className="mx-auto mt-20 w-[480px] py-5 px-[28px] rounded-lg bg-white">
      <h1 className="text-center p-7 text-[30px]">Log in</h1>
      <LoginForm />
    </div>
  );
}
