"use client";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: Props) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="p-4 border rounded"
        {...register}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
}
