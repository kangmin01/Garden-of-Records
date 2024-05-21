import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  hide?: boolean;
  hasLabel?: boolean;
  hasError: boolean;
};

export default function Input({
  id,
  type,
  placeholder,
  register,
  hide = false,
  hasLabel = true,
  hasError,
}: Props) {
  return (
    <input
      className={`w-full min-w-80 p-4 h-[64px] bg-white outline-none border-b-[1px] focus:outline-none ${hide ? "hidden" : ""} ${hasLabel ? "pl-[90px]" : ""} ${hasError ? "border-darkRed focus:border-darkRed pb-10" : "border-gray0 focus:border-main"}`}
      // className={`w-full min-w-80 p-4 h-[64px] text-[16px] bg-white outline-none border-b-[1px] focus:outline-none ${hide ? "hidden" : ""} ${hasLabel ? "pl-[90px]" : ""} ${hasError ? "border-darkRed focus:border-darkRed pb-10" : "border-gray0 focus:border-main"}`}
      id={id}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}
