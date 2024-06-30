import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import RightChevron from "../components/ui/icons/RightChevron";
import RecordDetailList from "../components/RecordDetailList";
import TrashIcon from "../components/ui/icons/TrashIcon";
import { useEffect, useState } from "react";
import { recordInfoType } from "../types/record";
import { formatNumber } from "../util/formatNumber";
import DangerIcon from "../components/ui/icons/DangerIcon";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setToast } from "../reducer/toast";

type Params = {
  eventId: string;
};

export default function RecordDetail() {
  const { eventId } = useParams<Params>();

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [record, setRecord] = useState<recordInfoType | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axiosInstance.get(`/invitation/expense`, {
          params: {
            event_id: eventId,
          },
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          // console.log(response.data);
          setRecord(response.data);
        } else {
          setRecord(null);
        }
      } catch (error) {
        console.error("전체 데이터 가져오기 실패", error);
        setRecord(null);
      }
    };

    fetchAllData();
  }, [token]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/invitation/expense`, {
        params: {
          event_id: eventId,
        },
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });

      // console.log("삭제 성공");
      navigate("/");
      dispatch(setToast("삭제되었습니다.", <DangerIcon />));
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="기록" />
      {record && (
        <>
          <div className="px-5">
            <div
              className={`border-solid ${record.is_invited === 1 ? "border-orange" : "border-main"} border flex flex-col h-[150px] rounded-lg mt-[24px]`}
            >
              <div className="h-[82px] flex flex-col items-center border-solid border-b-[1px] border-gray0 mt-[16px]">
                <div className="flex items-center justify-between w-[286px] h-[22px] mb-[20px]">
                  <span className="text-gray4 text-[18px] font-semibold">
                    {record.name}
                  </span>
                  <span className="text-gray2 text-[14px] font-400">
                    축의금
                  </span>
                </div>
                <div className="text-gray4 h-[24px] flex items-center justify-center">
                  <span className="font-bold text-[24px] mr-[12px]">
                    {formatNumber(record.amount)}
                  </span>
                  <span className="font-semibold text-[18px]">원</span>
                </div>
              </div>
              <a
                href={record.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex ${record.link === "" ? "cursor-default" : "cursor-pointer"} justify-center items-center h-[24px] mt-[16px]`}
              >
                <span
                  className={`${record.link === "" ? "text-gray2" : record.is_invited === 1 ? "text-orange" : "text-main"} text-[14px] font-medium mr-[8px]`}
                >
                  모바일 청첩장 확인
                </span>
                <RightChevron
                  color={`${record.link === "" ? "#808080" : record.is_invited === 1 ? "#EF9509" : "#37A041"}`}
                  size={13}
                />
              </a>
            </div>
          </div>
          <RecordDetailList record={record} />
          <div className="w-[320px] mt-[190px] mx-auto h-[48px] flex justify-between">
            <div
              onClick={handleDelete}
              className="w-[48px] h-full bg-gray1 rounded-lg flex justify-center items-center cursor-pointer"
            >
              <TrashIcon color="white" size={24} />
            </div>
            <Link
              to={`/event/${eventId}/edit`}
              className="text-white w-[256px] h-[48px] bg-main rounded-xl cursor-pointer flex justify-center items-center font-semibold text-[16px]"
            >
              수정
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
