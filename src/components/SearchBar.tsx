import { useState } from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const { isAuthenticated } = useAuthContext();
  // console.log(isAuthenticated);
  const token = localStorage.getItem("access_token");
  // console.log(token);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!keyword) return;
    console.log(keyword);

    try {
      const response = await axios.get(`/invitation/expense/search`, {
        params: {
          name: keyword,
          is_invited: "all",
        },
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });

      console.log("검색 결과", response.data);
    } catch (error) {
      console.log("검색 실패");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full mt-6 mb-5 text-[14px] font-normal flex justify-center relative">
      {/* <div className="w-full px-5 mt-6 mb-5 text-[14px] font-normal"> */}
      {/* <div className="flex items-center w-full border-solid border-[1px] border-gray0 rounded-lg bg-gray-50"> */}
      <input
        type="text"
        placeholder="이름을 검색해주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-gray6 w-[320px] h-[48px] border border-gray0 outline-none rounded-md p-2 text-[14px] font-normal placeholder-gray5 focus:border-main"
      />
      <button
        className="absolute top-[12px] right-[36px] text-h1 text-gray5"
        onClick={handleClick}
      >
        <SearchIcon />
      </button>
      {/* </div> */}
    </div>
  );
}
