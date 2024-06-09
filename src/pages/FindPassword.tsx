import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Snackbar } from "@mui/material";
import { useMessage } from "../context/MessageContext";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import logo_login from "../assets/image/logo_login.png";
import SubmitButton from "../components/ui/SubmitButton";

interface FindEmailFormType {
  email: string;
  contact: string;
}

export default function FindPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindEmailFormType>({ mode: "all" });
  const { state, clearMessage, setMessage } = useMessage();

  const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
  };

  const onSubmit = () => {};

  return (
    <div className="formPage">
      <Header title="비밀번호 찾기" />
      <div className="w-[140px] h-[74px] my-[64px]">
        <img src={logo_login} alt="기록의 정원 로고" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="inputContainerDiv">
          <div className="inputContainer">
            <label htmlFor="email" className="formLabel">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              hasError={!!errors.email}
              register={register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일 주소를 입력해주세요.",
                },
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
              type="text"
              placeholder="번호만 입력해주세요."
              hasError={!!errors.contact}
              onInput={handleInput}
              register={register("contact", {
                required: "번호만 입력해주세요.",
                pattern: {
                  value: /^010\d{8}$/,
                  message: "숫자만 입력해주세요.",
                },
              })}
              maxLength={11}
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
        <div className="mt-[24px]">
          <SubmitButton title="비밀번호 찾기" navigate={false} />
        </div>
      </form>
      {state.message && <Snackbar />}
    </div>
  );
}
