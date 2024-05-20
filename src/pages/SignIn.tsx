import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";

interface SignInFormType {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<SignInFormType> = (data) => {
    console.log(data);
    // 로그인 처리 로직 추가
  };

  return (
    <div className="formPage pt-[68px]">
      <h2 className="formPageTitle mb-14">기록의 정원</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="inputContainerDiv">
          <div className="inputContainer">
            <Input
              id="email"
              type="email"
              placeholder="이메일"
              hasLabel={false}
              hasError={!!errors.email}
              register={register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일 주소를 입력해주세요.",
                },
              })}
            />
            {errors.email && (
              <p className="errorText left-[34px]">{errors.email.message}</p>
            )}
          </div>
          <div className="inputContainer">
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              hasLabel={false}
              hasError={!!errors.password}
              register={register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {errors.password && (
              <p className="errorText left-[34px]">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="authenticationButtonDiv mt-[108px]">
          <button type="submit" className="authenticationButton">
            로그인
          </button>
          <Link
            className="w-full min-w-70 p-4 bg-gray0 text-gray2 rounded-xl text-center"
            to="/signup"
          >
            회원가입
          </Link>
        </div>
        <div className="w-full text-center">
          <div className="text-p mt-6 text-gray3 underline underline-offset-1">
            <Link to="/">로그인 없이 둘러보기</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
