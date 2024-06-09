import { ReactNode } from "react";
import BackButton from "./ui/BackButton";

type Props = {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function Header({
  title,
  leftIcon = <BackButton />,
  rightIcon,
}: Props) {
  return (
    <nav className="relative bg-white w-full max-w-[360px] mx-auto min-w-80 h-[56px] px-[16px] flex items-center text-[18px] font-bold border-solid border-b-[1px] border-gray0">
      {leftIcon ? leftIcon : <BackButton />}
      <h2 className="text-h1 mx-auto">{title}</h2>
      {rightIcon ? (
        <div className="absolute right-[16px]">{rightIcon}</div>
      ) : (
        <></>
      )}
    </nav>
  );
}
