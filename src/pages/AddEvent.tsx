import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../components/ui/BackButton";

interface FormData {
  tab: string;
  name: string;
  relationship: string;
  date: string;
  url: string;
  amount: string;
  memo: string;
  paymentType: string;
  participation: boolean;
}

export default function AddEvent() {
  const [tab, setTab] = useState("reviews");

  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      tab: "",
      name: "",
      relationship: "",
      date: "",
      url: "",
      amount: "",
      memo: "",
      paymentType: "계좌이체",
      participation: true,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="bg-neutral-50 w-full max-w-[360px] min-w-80 mx-auto h-screen flex flex-col items-center">
      <div className="w-full flex items-center py-3 bg-red-200 relative">
        <div className="absolute left-4">
          <BackButton />
        </div>
        <h1 className="text-h1 mx-auto justify-self-center">기록</h1>
      </div>
      <div className="tab-container">
        <button className="tab active" onClick={() => setTab("sent")}>
          낸 기록
        </button>
        <button className="tab" onClick={() => setTab("received")}>
          받은 기록
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input type="text" placeholder="이름" {...field} />
          )}
        />
        <Controller
          name="relationship"
          control={control}
          render={({ field }) => (
            <input type="text" placeholder="관계" {...field} />
          )}
        />
        <div className="relationship-options">
          {["배우자", "자녀", "자녀", "자녀", "자녀"].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setValue("relationship", option)}
            >
              {option}
            </button>
          ))}
        </div>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <input type="date" placeholder="날짜" {...field} />
          )}
        />
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <input type="text" placeholder="모바일 청첩장 URL" {...field} />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input type="text" placeholder="ex. 50,000원" {...field} />
          )}
        />
        <div className="amount-options">
          {[50000, 100000, 150000].map((amount) => (
            <button
              type="button"
              key={amount}
              onClick={() => setValue("amount", amount.toString())}
            >
              {amount.toLocaleString()}
            </button>
          ))}
        </div>
        <Controller
          name="memo"
          control={control}
          render={({ field }) => <textarea placeholder="메모" {...field} />}
        />
        <div className="radio-group">
          {["계좌이체", "현금", "선물"].map((type) => (
            <label key={type}>
              <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value={type}
                    checked={field.value === type}
                    onChange={() => field.onChange(type)}
                  />
                )}
              />
              {type}
            </label>
          ))}
        </div>
        <label className="checkbox-container">
          <Controller
            name="participation"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          참여
        </label>
        <button type="submit" className="submit-btn">
          등록하기
        </button>
      </form>
    </div>
  );
}
