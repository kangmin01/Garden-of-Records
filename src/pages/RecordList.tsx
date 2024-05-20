import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NotFound from "./NotFound";
import SearchBar from "../components/SearchBar";
import EventList from "../components/EventList";

type Params = {
  type: "send" | "receive";
};

export default function RecordList() {
  const { type } = useParams<Params>();
  const titleType = { send: "보낸 기록", receive: "받은 기록" };

  if (!type) {
    return <NotFound />;
  }

  return (
    <section className="bg-pink-50 max-w-[360px] mx-auto h-dvh relative">
      <Header title={titleType[type]} />
      <div className="px-5">
        <div className="bg-blue-100 flex flex-col justify-between h-[122px] rounded-xl px-[30px] pt-8 mt-6 mb-10 pb-6 shadow1">
          <div className="flex justify-between text-h2">
            <span className="text-gray2">총 누적 금액</span>
            <span className="text-gray4">총 10명</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-main text-[24px] font-bold mr-1">
              1,000,000
            </span>
            <span className="text-gray4 text-h1">원</span>
          </div>
        </div>
      </div>
      <SearchBar />
      <EventList />
    </section>
  );
}
