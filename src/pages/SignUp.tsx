import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignUpFormType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>();
  const onSubmit: SubmitHandler<SignUpFormType> = (data) => {
    console.log(data);
    // 회원가입 처리 로직 추가
  };

  return (
    <div>
      <h2>
        기록의 정원에<br></br> 당신을 기록해주세요
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="email">연락처</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="contact">이메일</label>
          <input
            id="contact"
            type="contact"
            {...register("contact", { required: "Contact is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
