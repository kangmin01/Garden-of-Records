import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  hasError: boolean;
};

export default function Input({
  id,
  type,
  placeholder,
  register,
  hasError,
}: Props) {
  return (
    <input
      className={`w-full min-w-70 p-4 border-[1.8px] rounded-xl border-gray1 focus:outline-none ${hasError ? "focus:border-darkRed" : "focus:border-main"}`}
      id={id}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}
