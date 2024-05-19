import HamburgerIcon from "../components/ui/icons/HamburgerIcon";
import EventListCard from "../components/EventListCard";
import FloatingButton from "../components/ui/FloatingButton";
import RecordCard from "../components/RecordCard";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-pink-50 max-w-[360px] mx-auto h-dvh relative">
      <nav className="bg-pink-100 max-w-[360px] mx-auto flex justify-between px-5 py-3 items-center text-h1">
        <div>
          <Link to="/">기록의 정원</Link>
        </div>
        <div>
          <HamburgerIcon />
        </div>
      </nav>
      <div className="bg-green-100 absolute h-[329px] w-[360px] rounded-b-[20px]"></div>
      <div className="w-[360px] absolute">
        <div className="bg-yellow-100 flex flex-col items-center mt-3 mb-6">
          <div className="w-[196px] h-[196px] bg-blue-200 rounded-full"></div>
          <span className="text-h1 mt-[22px]">최진영님</span>
        </div>
        <div className="flex justify-between px-4">
          <RecordCard type="send" totalCount={10} totalAmount={1000000000} />
          <RecordCard type="receive" totalCount={10} totalAmount={1000000000} />
        </div>
      </div>
      <div className="pt-[429px] w-full px-5">
        <div className="mb-2.5">
          <span>📆</span>
          <span className="text-h1"> 다가오는 일정</span>
        </div>
        <section className="divide-y-[1px]">
          {/* <section className="divide-y-[1px] h-[280px] overflow-y-auto"> */}
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
        </section>
      </div>
      <FloatingButton />
    </div>
  );
}
