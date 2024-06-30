import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../components/ui/icons/CheckIcon";
import DangerIcon from "../components/ui/icons/DangerIcon";
import axiosInstance from "../api/axiosInstance";
import useDeviceSize from "../hooks/useDeviceSize";
import { useDispatch } from "react-redux";
import { setToast } from "../reducer/toast";

interface SignUpFormType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

const inputFields = [
  {
    id: "name",
    type: "text",
    name: "이름",
    placeholder: "이름을 입력해주세요.",
    validation: { required: "이름을 입력해주세요." },
  },
  {
    id: "contact",
    type: "text",
    name: "연락처",
    placeholder: "번호만 입력해주세요.",
    validation: {
      required: "연락처를 입력해주세요.",
      pattern: {
        value: /^010\d{8}$/,
        message: "숫자만 입력해주세요.",
      },
      minLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
      maxLength: {
        value: 11,
        message: "11자리를 입력해주세요.",
      },
    },
  },
  {
    id: "email",
    type: "email",
    name: "이메일",
    placeholder: "ex) record@garden.com",
    validation: {
      required: "이메일을 입력해주세요.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "유효한 이메일 주소를 입력해주세요.",
      },
    },
  },
  {
    id: "password",
    type: "password",
    name: "비밀번호",
    placeholder: "영어+숫자 조합 6~10자",
    validation: {
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 6,
        message: "영어+숫자 조합 6~10자",
      },
      maxLength: {
        value: 10,
        message: "영어+숫자 조합 6~10자",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
        message: "영어+숫자 조합 6~10자",
      },
    },
  },
  {
    id: "confirmPassword",
    type: "password",
    name: "비밀번호 확인",
    placeholder: "영어+숫자 조합 6~10자",
    validation: {
      required: "비밀번호를 입력해주세요.",
      validate: (value: string, allValues: SignUpFormType) => {
        if (value !== allValues.password) {
          return "비밀번호가 일치하지 않습니다.";
        }
      },
    },
  },
];

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormType>({ mode: "onBlur" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDesktop } = useDeviceSize();

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    try {
      const response = await axiosInstance.post(
        `/user/signup`,
        {
          user_name: data.name,
          email: data.email,
          user_password: data.password,
          phone: data.contact,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("회원가입 성공", response);
      navigate("/signin");
      dispatch(setToast("회원가입이 완료 되었습니다.", <CheckIcon />));
    } catch (error) {
      dispatch(setToast("이미 등록된 이메일입니다.", <DangerIcon />));
      console.error("회원가입 오류:", error);
      // 오류 처리 로직 추가 (예: 사용자에게 오류 알림)
    }
  };

  const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className={`formPage ${isDesktop ? "h-full" : ""}`}>
      <Header title="회원가입" />
      <h2 className="formPageTitle place-self-start ml-5 my-6">
        기록의 정원에<br></br> 당신을 기록해주세요
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="min-w-80">
          {inputFields.map(({ id, type, name, placeholder, validation }) => (
            <div key={id} className="inputContainer">
              <label htmlFor={id} className="formLabel">
                {name}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                onInput={id === "contact" ? handleInput : undefined}
                hasError={!!errors[id as keyof SignUpFormType]}
                register={register(id as keyof SignUpFormType, validation)}
              />
              {errors[id as keyof SignUpFormType] && (
                <p className="errorText left-[90px]">
                  {errors[id as keyof SignUpFormType]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="authenticationButtonDiv mt-[170px]">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full min-w-80 py-[14px] rounded-xl text-[16px] font-semibold ${isValid ? "bg-main text-white cursor-pointer" : "bg-gray0 text-gray1"}`}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
