import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import logo_login from "../assets/image/logo_login.png";

interface FindEmailFormType {
  name: string;
  contact: string;
}

export default function FindEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindEmailFormType>({ mode: "all" });

  const onSubmit = () => {};

  return (
    <div className="formPage">
      <Header title="아이디 찾기" />
      <div className="w-[140px] h-[74px] my-[64px]">
        <img src={logo_login} alt="기록의 정원 로고" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="inputContainerDiv">
          <div className="inputContainer">
            <label htmlFor="name" className="formLabel">
              이름
            </label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              hasError={!!errors.name}
              register={register("name", {
                required: "이름을 입력해주세요.",
              })}
            />
            {/* {errors.name && (
              <p className="errorText left-[90px]">{errors.name.message}</p>
            )} */}
          </div>
          <div className="inputContainer">
            <label htmlFor="contact" className="formLabel">
              연락처
            </label>
            <Input
              id="contact"
              type="number"
              placeholder="번호만 입력해주세요."
              hasError={!!errors.contact}
              register={register("contact", {
                required: "번호만 입력해주세요.",
              })}
            />
            {/* {errors.contact && (
              <p className="errorText left-[90px]">{errors.contact.message}</p>
            )} */}
          </div>
        </div>
        <div className="w-full text-center">
          <div className="mt-[64px] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="14"
              fill="none"
            >
              <path
                stroke="#4C4C4C"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 1 1 7l6 6"
              />
            </svg>
            <Link
              to="/signin"
              className="ml-[13px] text-[14px] font-normal text-gray3 underline underline-offset-[1.5px]"
            >
              로그인 하러가기
            </Link>
          </div>
        </div>
        <div className="authenticationButtonDiv mt-[24px]">
          <button
            type="submit"
            className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-main text-white rounded-xl"
          >
            아이디 찾기
          </button>
        </div>
      </form>
    </div>
  );
}
