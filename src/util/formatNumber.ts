import { is } from "@react-spring/shared";

export const formatNumber = (number: number) => {
  return number.toLocaleString();
};

export const todayFormat = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDate = (date: string) => {
  const formattedDate = date.replace(/-/g, "");
  return formattedDate;
};

export const formatTime = (time: string) => {
  return time.replace(/:/g, "");
};

const days = ["일", "월", "화", "수", "목", "금", "토"];

export const formatToKoreanDateTime = (isoString: string) => {
  const date = new Date(isoString);

  const dayName = days[date.getDay()];

  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/-/g, ".");

  const formattedTime = isoString.slice(11, 16);

  return `${formattedDate} (${dayName}) ${formattedTime}`;
};

export const formatToKoreanDate = (isoString: string) => {
  const date = new Date(isoString);

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[date.getDay()];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day} (${dayName})`;
};

export const formatToKoreanTime = (isoString: string) => {
  return isoString.slice(11, 16);
};
