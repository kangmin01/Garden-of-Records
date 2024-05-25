import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import logo_login from "../assets/image/logo_login.png";

interface SignInFormType {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({ mode: "all" });
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(
        `/user/login`,
        {
          email: data.email,
          user_password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("로그인 성공", response);
      login(response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="formPage">
      <div className="w-[140px] h-[74px] mt-[80px] mb-[95px]">
        <img src={logo_login} alt="기록의 정원 로고" />
      </div>
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
              <p className="errorText left-[16px]">{errors.email.message}</p>
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
              <p className="errorText left-[16px]">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="authenticationButtonDiv mt-[112px]">
          <button
            type="submit"
            className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-main text-white rounded-xl"
          >
            로그인
          </button>
          <Link
            className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-gray0 text-gray2 rounded-xl"
            to="/signup"
          >
            회원가입
          </Link>
        </div>
        <div className="w-full text-center">
          <div className="mt-6 text-[14px] font-normal text-gray3 underline underline-offset-1">
            <Link to="/">로그인 없이 둘러보기</Link>
          </div>
        </div>
      </form>
      {showMessage && (
        <div
          className={`fixed bottom-[36px] w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl toast`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default SignIn;
