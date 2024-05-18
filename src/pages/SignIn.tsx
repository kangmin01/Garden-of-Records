import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface SignInFormType {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();
  const onSubmit: SubmitHandler<SignInFormType> = (data) => {
    console.log(data);
    // 로그인 처리 로직 추가
  };

  return (
    <div>
      <h2>기록의 정원</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            id="email"
            type="email"
            placeholder="이메일"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">로그인</button>
        <Link to="/signup">회원가입</Link>
        <div>
          <button>로그인 없이 둘러보기</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
