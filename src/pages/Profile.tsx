import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import RightChevron from "../components/ui/icons/RightChevron";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("access_token");
  const [info, setInfo] = useState<User | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/profile`, {
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        });

        // console.log("프로필 결과", response.data);
        if (response.data) {
          setInfo(response.data);
        } else {
          setInfo(null);
        }
      } catch (error) {
        console.error("실패", error);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="내 정보" />
      <div className="pt-[24px] px-[20px]">
        <div className="border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between">
          <span className="text-[14px] font-medium text-gray2">이름</span>
          <span className="text-[16px] font-normal text-gray4">
            {info?.user_name}
          </span>
        </div>
        <div className="border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between">
          <span className="text-[14px] font-medium text-gray2">이메일</span>
          <span className="text-[16px] font-normal text-gray4">
            {info?.email}
          </span>
        </div>
        <Link
          to="/profile/change-password"
          className="border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between"
        >
          <span className="text-[14px] font-medium text-gray2">
            비밀번호 변경
          </span>
          <span className="text-[16px] font-normal text-gray4">
            <RightChevron />
          </span>
        </Link>
      </div>
      <div className="fixed bottom-0 w-[360px] h-[56px] text-center">
        <div className="font-normal text-[14px] text-gray2">
          <span onClick={handleLogout} className="cursor-pointer">
            로그아웃
          </span>
          <span className="mx-[10px]">|</span>
          <span className="cursor-pointer">회원탈퇴</span>
        </div>
      </div>
    </section>
  );
}
