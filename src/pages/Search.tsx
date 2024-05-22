import EventList from "../components/EventList";
import EventListCard from "../components/EventListCard";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/ui/BackButton";
import not_found from "../assets/image/not_found.png";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <section className="max-w-[360px] mx-auto h-dvh relative">
      <nav className="max-w-[360px] mx-auto h-[56px] flex p-4 items-center text-h1 border-solid border-b-[1px] border-gray0">
        <BackButton />
        <h2 className="text-[18px] font-semibold mx-auto">검색</h2>
      </nav>
      <div>
        <SearchBar />
      </div>
      <EventList />
      {/* <div className="flex flex-col items-center justify-center">
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
      </div> */}
    </section>
  );
}
