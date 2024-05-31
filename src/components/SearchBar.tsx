import { useEffect, useState } from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import axios from "axios";
import EventList from "./EventList";
import not_found from "../assets/image/not_found.png";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

type Props = {
  type?: string;
  word?: string;
};

interface FetchPayload {
  is_invited: string;
  name?: string;
}

export default function SearchBar({ type, word }: Props) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const payload: FetchPayload = {
          is_invited: !type ? "all" : type,
        };
        if (word) {
          payload.name = word;
          setKeyword(word);
        }

        const response = await axiosInstance.get(`/invitation/expense/search`, {
          params: payload,
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("전체 데이터 가져오기 실패", error);
        setSearchResults([]);
      }
    };

    fetchAllData();
  }, [token, keyword]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!keyword) return;

    try {
      const response = await axiosInstance.get(`/invitation/expense/search`, {
        params: {
          name: keyword,
          is_invited: !type ? "all" : type,
        },
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });

      // console.log("검색 결과", response.data);
      if (response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("검색 실패", error);
      setSearchResults([]);
    }
  };

  return (
    <section>
      <div className="w-full mt-6 mb-5 text-[14px] font-normal flex justify-center relative">
        <input
          type="text"
          placeholder="이름을 검색해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-gray6 w-[320px] h-[48px] border border-gray0 outline-none rounded-md p-2 text-[14px] font-normal placeholder-gray5"
        />
        <button
          className="absolute top-[12px] right-[36px] text-h1 text-gray5"
          onClick={handleClick}
        >
          <SearchIcon />
        </button>
      </div>
      {searchResults.length !== 0 ? (
        <EventList records={searchResults} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src={not_found}
            alt="검색 결과 없음"
            className="w-[96px] h-[120px] mb-[48px] mt-[44px]"
          />
          <div className="text-[14px] font-normal text-gray2 flex flex-col items-center">
            <span>
              검색결과가 없습니다.<br></br>
            </span>
            <span>다시 검색해주세요.</span>
          </div>
          <Link
            to="/"
            className="mt-[28px] text-[14px] font-normal text-gray4 underline underline-offset-1"
          >
            메인으로 가기
          </Link>
        </div>
      )}
    </section>
  );
}
