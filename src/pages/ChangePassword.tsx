import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../components/Header";
import { ChangePasswordType } from "../types/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DangerIcon from "../components/ui/icons/DangerIcon";
import { useMessage } from "../context/MessageContext";
import CheckIcon from "../components/ui/icons/CheckIcon";
import { Snackbar } from "../components/SnackBar";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ChangePasswordType>({ mode: "onBlur" });

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const { setMessage, clearMessage, state } = useMessage();

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit: SubmitHandler<ChangePasswordType> = async (data) => {
    // console.log(data);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        {
          org_password: data.currentPassword,
          new_password: data.newPassword,
        },
        {
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("비밀번호 변경 성공", response);
      navigate("/profile");
      setMessage("비밀번호가 변경되었습니다.", <CheckIcon />);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage("현재 비밀번호가 일치하지 않습니다.", <DangerIcon />);
        console.error("비밀번호 변경 오류", error.response?.data.detail);
      } else {
        console.error("비밀번호 변경 오류", error);
      }
    }
  };

  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="비밀번호 변경" />
      <div className="pt-[24px] px-[20px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[320px] h-[64px] relative">
            <label
              htmlFor="currentPassword"
              className="text-[14px] font-medium text-gray2 absolute top-[11px] left-[10px]"
            >
              현재<br></br> 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              className={`w-full h-full outline-none pl-[106px] text-[16px] font-normal placeholder:text-gray1 border-b ${errors.currentPassword ? "border-darkRed" : "border-gray0 focus:border-main"}`}
              {...register("currentPassword", { required: true })}
              placeholder="현재 비밀번호"
            />
            {errors.currentPassword && (
              <span className="text-darkRed text-sm absolute w-full bottom-[4px] left-[107px]">
                비밀번호를 입력해주세요.
              </span>
            )}
          </div>
          <div className="w-[320px] h-[64px] relative">
            <label
              htmlFor="newPassword"
              className="text-[14px] font-medium text-gray2 absolute top-[11px] left-[10px]"
            >
              새로운<br></br> 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              className={`w-full h-full outline-none pl-[106px] text-[16px] font-normal placeholder:text-gray1 border-b ${errors.newPassword ? "border-darkRed" : "border-gray0 focus:border-main"}`}
              {...register("newPassword", {
                required: "새로운 비밀번호를 입력해주세요.",
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
              })}
              placeholder="영어+숫자 조합 6~10자"
            />
            {errors.newPassword && (
              <span className="text-darkRed text-sm absolute w-full bottom-[4px] left-[107px]">
                영어+숫자 조합 10자 이내
              </span>
            )}
          </div>
          <div className="w-[320px] h-[64px] relative">
            <label
              htmlFor="confirmPassword"
              className="text-[14px] font-medium text-gray2 absolute top-[11px] left-[10px]"
            >
              비밀번호<br></br> 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`w-full h-full outline-none pl-[106px] text-[16px] font-normal placeholder:text-gray1 border-b ${errors.confirmPassword ? "border-darkRed" : "border-gray0 focus:border-main"}`}
              {...register("confirmPassword", {
                required: "영어+숫자 조합 6~10자",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호 한번 더 입력"
            />
            {errors.confirmPassword && (
              <span className="text-darkRed text-sm absolute w-full bottom-[4px] left-[107px]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            disabled={!isValid}
            type="submit"
            className={`mt-[400px] w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center ${isValid ? "bg-main text-white cursor-pointer" : "bg-gray0 text-gray2"} rounded-xl`}
          >
            저장
          </button>
        </form>
      </div>
      {state.message &&
      state.message === "현재 비밀번호가 일치하지 않습니다." ? (
        <Snackbar position="top" />
      ) : (
        <Snackbar />
      )}
    </section>
  );
}
