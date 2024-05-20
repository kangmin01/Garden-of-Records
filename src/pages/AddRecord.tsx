import React, { useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Header from "../components/Header";
import Input from "../components/ui/Input";
import { formatNumber } from "../util/formatNumber";

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
  "^(https?:\\/\\/)?" + // protocol
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

  const handleButtonClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <section className="formPage">
      <Header title="기록 등록" />
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm mt-6">
        {/* Type */}
        <div
          className={`inputContainer bg-white w-full min-w-80 h-[64px] border-solid border-b-[1px] border-gray0 ${errors.type ? "border-darkRed" : ""}`}
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
                  {/* {fieldState.error && (
                    <span className="block text-darkRed absolute z-3">
                      {fieldState.error.message}
                    </span>
                  )} */}
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
          <Input
            id="mobileLink"
            type="text"
            placeholder="URL을 입력하세요."
            hasLabel={true}
            hasError={!!errors.mobileLink}
            register={register("mobileLink", {
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
        <div className="inputContainer">
          <label
            htmlFor="date"
            className="formLabel w-[90px]"
            onClick={handleButtonClick}
          >
            날짜
          </label>
          <Input
            id="date"
            type="date"
            hide={true}
            hasError={!!errors.date}
            // ref={dateInputRef}
            register={register("date", {
              required: "시간을 입력해주세요.",
            })}
          />
          {errors.date && <p>날짜를 선택해주세요.</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="formLabel">
            시간
          </label>
          <Input
            id="time"
            type="time"
            hasError={!!errors.time}
            register={register("time", {
              required: "시간을 입력해주세요.",
            })}
          />
          {errors.time && <p>시간을 선택해주세요.</p>}
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
