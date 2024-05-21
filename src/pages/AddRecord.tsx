import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Header from "../components/Header";
import Input from "../components/ui/Input";
import { formatNumber } from "../util/formatNumber";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormValues = {
  type: string;
  name: string;
  relation: string;
  mobileLink: string;
  date: string;
  time: string;
  attendance: boolean;
  amount: string;
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

export default function AddRecord() {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleItemClick = (item: keyof FormValues, value: string) => {
    setValue(item, value);
    clearErrors(`${item}`);
  };

  const dateInputRef = useRef<HTMLInputElement>(null);
  const selectedDate = watch("date", "");
  const handleLabelClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="formPage">
      <Header title="기록 등록" />
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm mt-6">
        {/* Type */}
        <div
          className={`w-full h-[64px] flex relative bg-white min-w-80 border-solid border-b-[1px] border-gray0 ${errors.type ? "border-darkRed" : ""}`}
        >
          <label htmlFor="type" className="formLabel">
            분류
          </label>
          <div className="absolute top-5 left-[88px]">
            <label className="formLabelRadio mr-2">
              <Input
                id="type1"
                type="radio"
                hide={true}
                hasError={!!errors.type}
                register={register("type", { required: true })}
              />
              낸 기록
            </label>
            <label className="formLabelRadio">
              <Input
                id="type2"
                type="radio"
                hide={true}
                hasError={!!errors.type}
                register={register("type", { required: true })}
              />
              보낸 기록
            </label>
          </div>
          {errors.type && <p>분류를 선택해주세요.</p>}
        </div>

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
          {errors.name && (
            <p className="errorText left-[90px]">{errors.name.message}</p>
          )}
        </div>

        {/* Relation*/}
        <section className="relative">
          <div>
            <label
              htmlFor="relation"
              className="text-gray2 text-p absolute top-5"
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
                    className={`w-full border-b pl-[90px] pb-10 h-[100px] outline-none ${fieldState.error ? "border-darkRed focus:border-darkRed" : "border-gray0 focus:border-main"}`}
                    placeholder="관계를 선택해주세요"
                  />
                </>
              )}
            />
          </div>
          {/* Relation Buttons */}
          <div className="w-full flex space-x-2 justify-end absolute bottom-3">
            <button
              type="button"
              onClick={() => handleItemClick("relation", "가족")}
              className="selectButton"
            >
              가족
            </button>
            <button
              type="button"
              onClick={() => handleItemClick("relation", "친구")}
              className="selectButton"
            >
              친구
            </button>
            <button
              type="button"
              onClick={() => handleItemClick("relation", "직장")}
              className="selectButton"
            >
              직장
            </button>
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
            className={`w-full min-w-80 text-p p-4 placeholder:text-p placeholder:text-gray1 h-[64px] text-gray1 bg-white outline-none border-b-[1px] focus:outline-none pl-[90px] ${errors.mobileLink ? "border-darkRed focus:border-darkRed pb-10" : "border-gray0 focus:border-main"}`}
            placeholder="URL을 입력하세요."
            {...register("mobileLink", {
              required: "URL을 입력하세요.",
              pattern: {
                value: urlPattern,
                message: "유효한 URL을 입력해주세요.",
              },
            })}
          />
          {errors.mobileLink && (
            <p className="errorText left-[90px]">{errors.mobileLink.message}</p>
          )}
        </div>

        {/* Date */}
        <div
          onClick={() => {
            setIsFocused(true);
            handleLabelClick();
          }}
          className={`w-full h-[65px] flex relative border-b-[1px] border-solid ${errors.date ? "border-darkRed focus:border-darkRed" : isFocused ? "border-main" : "border-gray0"}`}
        >
          <label htmlFor="date" className="formLabel z-20 w-[90px]">
            날짜
          </label>
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{
              required: "필수 입력요소",
            }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                ref={dateInputRef}
                className={`w-full absolute z-0 h-[64px] max-h-[64px] outline-none`}
                onChange={(e) => {
                  setValue("date", e.target.value);
                }}
                onBlur={() => {
                  field.onBlur();
                  setIsFocused(false);
                }}
              />
            )}
          />
          {selectedDate ? (
            <span
              className="absolute text-gray4 text-p z-30 top-[21px] left-[92px]"
              onClick={handleLabelClick}
            >
              {new Date(selectedDate).toLocaleDateString()}
            </span>
          ) : (
            <span
              className="absolute text-gray1 text-p z-30 top-[21px] left-[92px]"
              onClick={handleLabelClick}
            >
              날짜를 선택해주세요.
            </span>
          )}
        </div>

        {/* Time */}
        <div
          className={`w-full h-[65px] flex relative border-b-[1px] border-solid ${errors.date ? "border-darkRed focus:border-darkRed" : isFocused ? "border-main" : "border-gray0"}`}
        >
          <label htmlFor="time" className="formLabel z-20 w-[90px]">
            시간
          </label>
          <Controller
            name="time"
            control={control}
            defaultValue=""
            rules={{ required: "시간을 입력해주세요." }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                id="time"
                type="time"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (e.target.value) {
                    clearErrors("time");
                  }
                }}
                onBlur={() => {
                  if (!field.value) {
                    setError("relation", {
                      type: "manual",
                      message: "시간을 입력해주세요.",
                    });
                  }
                }}
                className={`w-full border-b h-[64px] pl-[91px] text-p text-gray2 outline-none ${fieldState.error ? "border-darkRed focus:border-darkRed" : "border-gray0 focus:border-main"}`}
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
              className="text-gray2 text-p absolute top-[18px]"
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
                  <input
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
                  />
                  {/* {fieldState.error && (
                    <span className="text-darkRed">
                      {fieldState.error.message}
                    </span>
                  )} */}
                </>
              )}
            />
          </div>
          {/* Amount Buttons */}
          <div className="w-full flex space-x-2 justify-end absolute bottom-3">
            <button
              type="button"
              onClick={() => handleItemClick("amount", formatNumber(50000))}
              className="selectButton"
            >
              {formatNumber(50000)}
            </button>
            <button
              type="button"
              onClick={() => handleItemClick("amount", formatNumber(100000))}
              className="selectButton"
            >
              {formatNumber(100000)}
            </button>
            <button
              type="button"
              onClick={() => handleItemClick("amount", formatNumber(150000))}
              className="selectButton"
            >
              {formatNumber(150000)}
            </button>
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
