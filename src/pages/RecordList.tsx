import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import NotFound from "./NotFound";
import SearchBar from "../components/SearchBar";
import EventList from "../components/EventList";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../util/formatNumber";

type Params = {
  type: "send" | "receive";
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const location = useLocation();
  const { type } = useParams<Params>();
  const titleType = { send: "보낸 기록", receive: "받은 기록" };
  const apiType = { send: "invited", receive: "inviting" };

  const token = localStorage.getItem("access_token");

  if (!type) {
    return <NotFound />;
  }

  const message = location.state?.message;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordsResponse, totalResponse] = await Promise.all([
          axios.get(`/invitation/expenses`, {
            params: {
              is_invited: apiType[type],
            },
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
          axios.get(`/invitation/expense/total`, {
            params: {
              is_invited: apiType[type],
            },
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (recordsResponse.data) {
          setRecords(recordsResponse.data);
        } else {
          setRecords([]);
        }

        if (totalResponse.data) {
          setTotalAmount(totalResponse.data.total_expense);
        } else {
          setTotalAmount(0);
        }
        console.log(recordsResponse.data, totalResponse.data);
      } catch (error) {
        console.error("실패", error);
        setRecords([]);
        setTotalAmount(0);
      }
    };

    fetchData();
  }, [token]);

  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title={titleType[type]} />
      <div className="px-5">
        <div
          className={`border-solid ${type === "send" ? "border-orange" : "border-main"}  border flex flex-col justify-between h-[108px] rounded-lg px-[20px] pt-[24px] mt-[24px] pb-6`}
        >
          <div className="flex justify-between h-[20px] text-[16px] font-medium mb-[16px]">
            <span className="text-gray2">총 누적 금액</span>
            <span className="text-gray4">총 {records.length}명</span>
          </div>
          <div className="flex justify-end items-center h-[24px]">
            <span
              className={`${type === "send" ? "text-orange" : "text-main"} text-[24px] font-bold mr-1`}
            >
              {formatNumber(totalAmount)}
            </span>
            <span className="text-gray4 text-[16px] font-medium">원</span>
          </div>
        </div>
      </div>
      <SearchBar type={apiType[type]} />
      {showMessage && (
        <div className="w-full max-w-[360px] min-w-80 mx-auto flex justify-center">
          <div
            className={`fixed bottom-[36px] w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl toast`}
          >
            {message}
          </div>
        </div>
      )}
    </section>
  );
}
