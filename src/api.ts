import axios from "axios";
import { formatDate, todayFormat } from "./util/formatNumber";

export const fetchUpcomingEvents = async (token: string) => {
  const { data } = await axios.get(`/invitation/expenses`, {
    params: {
      is_invited: "invited",
      offset: formatDate(todayFormat()) + "0000",
      order: "asc",
    },
    headers: {
      "access-token": token,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchTotalSendAmounts = async (token: string) => {
  const { data } = await axios.get(`/invitation/expense/total`, {
    params: {
      is_invited: "invited",
    },
    headers: {
      "access-token": token,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchTotalReceiveAmounts = async (token: string) => {
  const { data } = await axios.get(`/invitation/expense/total`, {
    params: {
      is_invited: "inviting",
    },
    headers: {
      "access-token": token,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchUserInfo = async (token: string) => {
  const { data } = await axios.get(`/user/profile`, {
    headers: {
      "access-token": token,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchUserScore = async (token: string) => {
  const { data } = await axios.get(`/user/score`, {
    headers: {
      "access-token": token,
      "Content-Type": "application/json",
    },
  });
  return data;
};
