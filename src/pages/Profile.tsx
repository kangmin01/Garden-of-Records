import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import RightChevronThin from "../components/ui/icons/RightChevronThin";
import { useMessage } from "../context/MessageContext";
import axiosInstance from "../api/axiosInstance";
import useDeviceSize from "../hooks/useDeviceSize";

export default function Profile() {
  const token = localStorage.getItem("access_token");
  const [info, setInfo] = useState<User | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const { state, clearMessage } = useMessage();

  const { isDesktop } = useDeviceSize();

  useEffect(() => {
    if (state.message) {
      clearMessage();
    }
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile`, {
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
      <Header title="프로필" />
      <div className="pt-[24px] px-[20px] mb-[24px]">
        <span className="block pl-[16px] font-semibold text-[16px] text-gray4">
          내 정보
        </span>
        <div className="mt-[16px] p-[16px] border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between">
          <span className="text-[14px] font-medium text-gray2">이름</span>
          <span className="text-[16px] font-normal text-gray4">
            {info?.user_name}
          </span>
        </div>
        <div className="p-[16px] border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between">
          <span className="text-[14px] font-medium text-gray2">이메일</span>
          <span className="text-[16px] font-normal text-gray4">
            {info?.email}
          </span>
        </div>
        <Link
          to="/profile/change-password"
          className="p-[16px] border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between"
        >
          <span className="text-[14px] font-medium text-gray2">
            비밀번호 변경
          </span>
          <span className="text-[16px] font-normal text-gray4">
            <RightChevronThin />
          </span>
        </Link>
      </div>

      <div className="px-[20px]">
        <span className="block pl-[16px] font-semibold text-[16px] text-gray4">
          약관
        </span>
        <Link
          to="/"
          className="mt-[16px] p-[16px] border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between"
        >
          <span className="text-[14px] font-medium text-gray2">이용약관</span>
          <span className="text-[16px] font-normal text-gray4">
            <RightChevronThin />
          </span>
        </Link>
        <Link
          to="/"
          className="p-[16px] border-solid border-b-[1px] border-gray0 w-[320px] h-[50px] flex items-center justify-between"
        >
          <span className="text-[14px] font-medium text-gray2">
            개인정보처리방침
          </span>
          <span className="text-[16px] font-normal text-gray4">
            <RightChevronThin />
          </span>
        </Link>
      </div>

      <div
        className={`fixed w-[360px] h-[56px] text-center ${isDesktop ? "top-[834px]" : "bottom-0"}`}
      >
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
