import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    placeholder: "실명을 입력해주세요.",
    validation: { required: "이름을 입력해주세요." },
  },
  {
    id: "contact",
    type: "number",
    name: "연락처",
    placeholder: "ex) 01012345678",
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
    placeholder: "영어+숫자 조합 10자 이내",
    validation: {
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 6,
        message: "비밀번호는 최소 6자 이상이어야 합니다.",
      },
      maxLength: {
        value: 10,
        message: "비밀번호는 최대 10자 이내여야 합니다.",
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
        message: "비밀번호는 영어, 숫자를 포함한 10자 이내여야 합니다.",
      },
    },
  },
  {
    id: "confirmPassword",
    type: "password",
    name: "비밀번호 확인",
    placeholder: "비밀번호를 한번 더 입력해주세요.",
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

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    try {
      const response = await axios.post(
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
      console.log("회원가입 성공", response);
      navigate("/signin", {
        state: { message: "회원가입이 완료 되었습니다." },
      });
    } catch (error) {
      console.error("회원가입 오류:", error);
      // 오류 처리 로직 추가 (예: 사용자에게 오류 알림)
    }
  };

  return (
    <div className="formPage">
      <Header title="회원가입" />
      <h2 className="formPageTitle place-self-start ml-5 my-6">
        기록의 정원에<br></br> 당신을 기록해주세요
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm">
        <div className="inputContainerDiv">
          {inputFields.map(({ id, type, name, placeholder, validation }) => (
            <div key={id} className="inputContainer">
              <label htmlFor={id} className="formLabel">
                {name}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
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
        <div className="authenticationButtonDiv mt-10">
          <button
            type="submit"
            className={`w-full min-w-80 p-4 rounded-xl text-[16px] font-semibold ${isValid ? "bg-main text-white cursor-pointer" : "bg-gray0 text-gray2"}`}
            disabled={!isValid}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
