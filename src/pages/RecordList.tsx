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
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title={titleType[type]} />
      <div className="px-5">
        <div
          className={`border-solid ${type === "send" ? "border-orange" : "border-main"}  border flex flex-col justify-between h-[108px] rounded-lg px-[20px] pt-[24px] mt-[24px] pb-6`}
        >
          <div className="flex justify-between h-[20px] text-[16px] font-medium mb-[16px]">
            <span className="text-gray2">총 누적 금액</span>
            <span className="text-gray4">총 10명</span>
          </div>
          <div className="flex justify-end items-center h-[24px]">
            <span
              className={`${type === "send" ? "text-orange" : "text-main"} text-[24px] font-bold mr-1`}
            >
              1,000,000
            </span>
            <span className="text-gray4 text-[16px] font-medium">원</span>
          </div>
        </div>
      </div>
      <SearchBar />
      <EventList />
    </section>
  );
}
