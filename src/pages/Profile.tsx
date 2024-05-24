import axios from "axios";
import Header from "../components/Header";
import { useEffect } from "react";

export default function Profile() {
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/score`, {
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        console.log("결과", response.data);
      } catch (error) {
        console.error("실패", error);
        // setUpcomingEvents([])?;
      }
    };

    fetchData();
  }, [token]);
  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="내 정보" />
    </section>
  );
}
