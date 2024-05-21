import React, { useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerFieldState,
} from "react-hook-form";
import Header from "../components/Header";
import Input from "../components/ui/Input";
import { formatNumber, todayFormat } from "../util/formatNumber";

type FormValues = {
  name: string;
  relation: string;
  mobileLink: string;
  date: string;
  time: string;
  attendance: boolean;
  amount: string;
};

type FocusState = {
  [key in keyof FormValues]?: boolean;
};

type InvalidState = {
  [key in keyof FormValues]?: boolean;
};

const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

const relationArray = ["가족", "친구", "직장"];
const amountArray = ["50000", "1000000", "150000"];

export default function AddRecord() {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleItemClick = (item: keyof FormValues, value: string) => {
    setValue(item, value);
    clearErrors(`${item}`);
    setSelectedRelation(value);
  };

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const handleDateLabelClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  const handleTimeLabelClick = () => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker();
    }
  };

  const [isFocused, setIsFocused] = useState<FocusState>({});
  const [isInvalid, setIsInvalid] = useState<InvalidState>({});
  const handleFocus = (name: keyof FormValues) => {
    setIsFocused((prev) => ({ ...prev, [name]: true }));
  };
  const handleBlur = (
    name: keyof FormValues,
    fieldState: ControllerFieldState
  ) => {
    setIsFocused((prev) => ({ ...prev, [name]: false }));
    setIsInvalid((prev) => ({ ...prev, [name]: fieldState.invalid }));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="formPage" id="addRecord">
      <Header title="기록 등록" />
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm mt-6">
        {/* Name */}
        <div className="inputContainer">
          <label
            htmlFor="name"
            className="text-gray2 text-p absolute top-[22px]"
          >
            이름
          </label>
          <Input
            id="name"
            type="text"
            placeholder="상대방 이름"
            hasError={!!errors.name}
            register={register("name", {
              required: "이름을 입력해주세요.",
            })}
          />
          {/* {errors.name && (
            <p className="errorText left-[90px]">{errors.name.message}</p>
          )} */}
        </div>

        {/* Relation*/}
        <section className="relative">
          <div>
            <label
              htmlFor="relation"
              className="text-gray2 text-p absolute top-[35px]"
            >
              관계
            </label>
            <Controller
              name="relation"
              control={control}
              defaultValue=""
              rules={{ required: "관계를 입력해주세요." }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    id="relation"
                    type="text"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      if (e.target.value) {
                        clearErrors("relation");
                        if (!(e.target.value in relationArray)) {
                          setSelectedRelation(null);
                        }
                      }
                    }}
                    onBlur={() => {
                      if (!field.value) {
                        setError("relation", {
                          type: "manual",
                          message: "관계를 입력해주세요.",
                        });
                      }
                    }}
                    className={`w-full border-b placeholder:text-gray1 pl-[90px] pb-10 h-[100px] outline-none focus:border-main ${!fieldState.error ? "border-gray0" : isButtonClicked ? "border-main" : "border-darkRed focus:border-darkRed"}`}
                    placeholder="관계를 선택해주세요"
                  />
                  <div className="w-full flex space-x-2 justify-end absolute bottom-3">
                    {relationArray.map((relation) => (
                      <button
                        key={relation}
                        type="button"
                        onMouseDown={() => setIsButtonClicked(true)}
                        onMouseUp={() => setIsButtonClicked(false)}
                        onClick={() => handleItemClick("relation", relation)}
                        className={`selectButton ${
                          selectedRelation === relation ? "selectedButton" : ""
                        }`}
                      >
                        {relation}
                      </button>
                    ))}
                  </div>
                </>
              )}
            />
          </div>
        </section>

        {/* Mobile Link */}
        <div className="inputContainer">
          <label
            htmlFor="mobileLink"
            className="text-gray2 text-p absolute top-[12px]"
          >
            모바일<br></br>청첩장
          </label>
          <input
            id="mobileLink"
            type="text"
            className={`w-full min-w-80 placeholder:text-gray1 text-p p-4 h-[64px] text-gray1 bg-white outline-none border-b-[1px] focus:outline-none pl-[90px] focus:border-main ${errors.mobileLink ? "border-darkRed" : "border-gray0 "}`}
            placeholder="URL을 입력하세요."
            {...register("mobileLink", {
              required: "URL을 입력하세요.",
              pattern: {
                value: urlPattern,
                message: "유효한 URL을 입력해주세요.",
              },
            })}
          />
          {/* {errors.mobileLink && (
            <p className="errorText left-[90px]">{errors.mobileLink.message}</p>
          )} */}
        </div>

        {/* Date */}
        <div className="w-full h-[65px] flex relative">
          <label
            htmlFor="date"
            className="absolute h-[64px] w-[90px] flex items-center text-gray2 text-p z-20"
            onClick={handleDateLabelClick}
          >
            날짜
          </label>
          <Controller
            name="date"
            control={control}
            defaultValue={todayFormat()}
            rules={{ required: "필수 입력요소" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                id="date"
                type="date"
                ref={dateInputRef}
                className={`w-full border-b-[1px] absolute pl-[90px] z-0 h-[64px] max-h-[64px] outline-none ${
                  isFocused["date"]
                    ? "border-main"
                    : fieldState.invalid
                      ? "border-darkRed"
                      : "border-gray0"
                }`}
                onChange={(e) => {
                  setValue("date", e.target.value);
                  setIsInvalid((prev) => ({
                    ...prev,
                    time: fieldState.invalid,
                  }));
                }}
                onBlur={() => handleBlur("date", fieldState)}
                onFocus={() => handleFocus("date")}
              />
            )}
          />
        </div>

        {/* Time */}
        <div className="w-full h-[65px] flex relative">
          <label
            htmlFor="time"
            className="absolute h-[64px] w-[90px] flex items-center text-gray2 text-p z-20"
            onClick={handleTimeLabelClick}
          >
            시간
          </label>
          <Controller
            name="time"
            control={control}
            defaultValue="11:00"
            rules={{ required: "필수 입력요소" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                id="time"
                type="time"
                ref={timeInputRef}
                className={`w-full placeholder:text-gray0 border-b-[1px] absolute pl-[90px] z-0 h-[64px] max-h-[64px] outline-none ${
                  isFocused["time"]
                    ? "border-main"
                    : fieldState.invalid
                      ? "border-darkRed"
                      : "border-gray0"
                } `}
                onChange={(e) => {
                  setValue("time", e.target.value);
                  setIsInvalid((prev) => ({
                    ...prev,
                    time: fieldState.invalid,
                  }));
                }}
                onBlur={() => handleBlur("time", fieldState)}
                onFocus={() => handleFocus("time")}
              />
            )}
          />
        </div>

        {/* Attendance */}
        <div>
          <label>참석여부</label>
          <input type="checkbox" {...register("attendance")} />
        </div>

        {/* Amount*/}
        <section className="relative">
          <div>
            <label
              htmlFor="amount"
              className="text-gray2 text-p absolute top-[35px]"
            >
              축의금
            </label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: "축의금을 입력해주세요.",
                pattern: {
                  value: /^\d*$/,
                  message: "숫자만 입력 가능합니다.",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  {/* <input
                    id="amount"
                    type="text"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, "");
                      if (/^\d*$/.test(rawValue)) {
                        const formattedValue = formatNumber(Number(rawValue));
                        field.onChange(formattedValue);
                        clearErrors("amount");
                      }
                    }}
                    onBlur={(e) => {
                      const rawValue = e.target.value.replace(/,/g, "");
                      if (rawValue) {
                        field.onChange(formatNumber(Number(rawValue)));
                      }
                      if (!field.value) {
                        setError("amount", {
                          type: "manual",
                          message: "관계를 입력해주세요.",
                        });
                      }
                    }}
                    className={`w-full border-b pl-[90px] pb-10 h-[100px] outline-none ${fieldState.error ? "border-darkRed focus:border-darkRed" : "border-gray0 focus:border-main"}`}
                    placeholder="숫자만 입력해주세요"
                  /> */}
                  <input
                    id="amount"
                    type="text"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      if (e.target.value) {
                        clearErrors("amount");
                        if (!(e.target.value in amountArray)) {
                          setSelectedRelation(null);
                        }
                      }
                    }}
                    onBlur={() => {
                      if (!field.value) {
                        setError("amount", {
                          type: "manual",
                          message: "관계를 입력해주세요.",
                        });
                      }
                    }}
                    className={`w-full border-b placeholder:text-gray1 pl-[90px] pb-10 h-[100px] outline-none focus:border-main ${!fieldState.error ? "border-gray0" : isButtonClicked ? "border-main" : "border-darkRed focus:border-darkRed"}`}
                    placeholder="숫자만 입력해주세요."
                  />
                  <div className="w-full flex space-x-2 justify-end absolute bottom-3">
                    {amountArray.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onMouseDown={() => setIsButtonClicked(true)}
                        onMouseUp={() => setIsButtonClicked(false)}
                        onClick={() => handleItemClick("amount", amount)}
                        className={`selectButton ${
                          selectedRelation === amount ? "selectedButton" : ""
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </>
              )}
            />
          </div>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="submitButton bg-main text-white text-h1 mt-9"
        >
          정보 등록
        </button>
      </form>
    </section>
  );
}
