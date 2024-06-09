import { Link } from "react-router-dom";

type Props = {
  navigate: boolean;
  title: string;
  link?: string;
  textColor?: string;
  bgColor?: string;
  disabledColor?: string;
};

export default function SubmitButton({
  navigate,
  title,
  link = "/",
  textColor,
  bgColor,
  disabledColor,
}: Props) {
  return navigate ? (
    <Link
      to={link}
      className={`${bgColor ? bgColor : "bg-gray1"} ${textColor ? textColor : "text-white"} w-[320px] h-[48px] font-semibold text-[16px] flex items-center justify-center rounded-xl`}
    >
      {title}
    </Link>
  ) : (
    <button
      type="submit"
      className={`${bgColor ? bgColor : "bg-main"} ${textColor ? textColor : "text-white"} w-[320px] h-[48px] font-semibold text-[16px] flex items-center justify-center rounded-xl`}
    >
      {title}
    </button>
  );
}
