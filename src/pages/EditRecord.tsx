import { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerFieldState,
} from "react-hook-form";
import Header from "../components/Header";
import Input from "../components/ui/Input";
import {
  formatDate,
  formatNumber,
  formatTime,
  todayFormat,
} from "../util/formatNumber";
import RequiredFieldMark from "../components/ui/RequiredFieldMark";
import axios from "axios";
import { IOSSwitch } from "../components/ui/IOSWsitch";
import { Params, useNavigate, useParams } from "react-router-dom";
import {
  FocusState,
  FormValues,
  InvalidState,
  PayloadType,
  recordInfoType,
} from "../types/record";
import { useMessage } from "../context/MessageContext";
import CheckIcon from "../components/ui/icons/CheckIcon";
import axiosInstance from "../api/axiosInstance";

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
const amountArray = ["50000", "100000", "150000"];

export default function EditRecord() {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
  });
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const navigate = useNavigate();
  const { setMessage, state } = useMessage();

  const handleItemClick = (item: keyof FormValues, value: string) => {
    setValue(item, value);
    clearErrors(`${item}`);
    if (item === "relation") {
      setSelectedRelation(value);
    } else if (item === "amount") {
      setSelectedAmount(value);
    }
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

  const token = localStorage.getItem("access_token");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let dateTime = "";
    if (data.time.length === 0) {
      dateTime = formatDate(data.date) + "0000";
    } else {
      dateTime = formatDate(data.date) + formatTime(data.time);
    }
    // console.log("data", data);

    const payload: PayloadType = {
      event_id: eventId,
      is_invited: data.tab,
      name: data.name,
      event_date: dateTime,
      is_attended: data.attendance === false ? 1 : 2,
      expense: Number(data.amount),
    };

    if (data.relation) {
      payload.relation = data.relation;
    }

    if (data.mobileLink) {
      payload.link = data.mobileLink;
    }
    // console.log(payload);

    try {
      const response = await axiosInstance.put(`/invitation/expense`, payload, {
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });
      // console.log("기록 수정 결과", response.data);
      navigate("/");
      setMessage("수정 완료 되었습니다.", <CheckIcon />);
    } catch (error) {
      // console.log("기록 수정 실패");
      console.error("Error fetching data:", error);
    }
  };

  const nameValue = watch("name");
  const dateValue = watch("date");
  const amountValue = watch("amount");
  const allRequiredFieldsFilled = nameValue && dateValue && amountValue;

  const [record, setRecord] = useState<recordInfoType | null>(null);

  const [tab, setTab] = useState("invited");
  const handleTab = () => {
    const newTab = tab === "invited" ? "inviting" : "invited";
    setTab(newTab);
    setValue("tab", newTab);
  };

  const { eventId } = useParams<Params>();

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
          setRecord(response.data);
          //
          setTab(response.data.is_invited === 1 ? "invited" : "inviting");
          setValue(
            "tab",
            response.data.is_invited === 1 ? "invited" : "inviting"
          );
          setValue("name", response.data.name);
          setValue("relation", response.data.relation);
          setValue("mobileLink", response.data.mobileLink);
          setValue("date", response.data.event_date.split("T")[0]);
          if (
            response.data.event_date.split("T")[1].substring(0, 5) !== "00:00"
          ) {
            setValue(
              "time",
              response.data.event_date.split("T")[1].substring(0, 5)
            );
          }
          setValue("attendance", response.data.is_attended === 2);
          setValue("amount", response.data.amount);
          //   setSelectedRelation(response.data.relation);
          //   setSelectedAmount(response.data.amount.toString());

          if (amountArray.includes(response.data.amount.toString())) {
            setSelectedAmount(response.data.amount.toString());
          }
          if (relationArray.includes(response.data.relation)) {
            setSelectedRelation(response.data.relation);
          }
        } else {
          setRecord(null);
        }
      } catch (error) {
        console.error("전체 데이터 가져오기 실패", error);
        setRecord(null);
      }
    };

    fetchAllData();
  }, [token, eventId, setValue]);

  return (
    <section className="formPage" id="addRecord">
      <Header title="기록 수정" />
      <form onSubmit={handleSubmit(onSubmit)} className="formPageForm mt-6">
        {/* tab */}
        <Controller
          name="tab"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="w-full relative">
              <div
                className={`w-[150px] h-[36px] bg-white absolute top-[4px] left-[9.5px] rounded-lg shadow-shadowTabButton z-10 transition-transform duration-500 ${tab === "inviting" ? "translate-x-[150px]" : ""}`}
              ></div>
              <div className="w-[308px] mx-auto h-[44px] bg-gray0 rounded-xl z-20"></div>
              <div
                onClick={handleTab}
                className={`text-[14px] font-semibold flex w-[300px] absolute z-20 top-[4px] left-[10px] cursor-pointer `}
              >
                <span
                  className={`w-[150px] h-[36px] flex justify-center items-center text-transition ${tab === "invited" ? "text-gray4" : "text-gray2"}`}
                >
                  보낸 기록
                </span>
                <span
                  className={`w-[150px] h-[36px] flex justify-center items-center text-transition ${tab === "invited" ? "text-gray2" : "text-gray4"}`}
                >
                  받은 기록
                </span>
              </div>
            </div>
          )}
        />

        {/* Name */}
        <div className="inputContainer">
          <label
            htmlFor="name"
            className="text-gray2 text-p absolute top-[22px]"
          >
            이름
          </label>
          <RequiredFieldMark />
          <Input
            id="name"
            type="text"
            placeholder="상대방 이름"
            hasError={!!errors.name}
            register={register("name", {
              required: "이름을 입력해주세요.",
            })}
          />
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
              // rules={{ required: "관계를 입력해주세요." }}
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
                    className={`w-full border-b placeholder:text-gray1 pl-[90px] pb-10 h-[100px] outline-none focus:border-main`}
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
              pattern: {
                value: urlPattern,
                message: "유효한 URL을 입력해주세요.",
              },
            })}
          />
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
          <RequiredFieldMark />
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
            defaultValue=""
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
        <Controller
          name="attendance"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="relative flex w-full h-[60px] border-b-[1px] border-solid border-gray0 items-center justify-between">
              <label className="text-gray2 text-p top-[35px]">참석여부</label>
              <RequiredFieldMark top="17" left="51" />
              <IOSSwitch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </div>
          )}
        />

        {/* Amount*/}
        <section className="relative">
          <div>
            <label
              htmlFor="amount"
              className="text-gray2 text-p absolute top-[35px]"
            >
              축의금
            </label>
            <RequiredFieldMark top="33" left="39" />
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
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
                    value={formatNumber(+field.value)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, "");
                      if (/^\d*$/.test(rawValue)) {
                        field.onChange(rawValue);
                        if (rawValue) {
                          clearErrors("amount");
                          if (!(rawValue in amountArray)) {
                            setSelectedAmount(null);
                          }
                        }
                      }
                    }}
                    onBlur={() => {
                      if (!field.value) {
                        setError("amount", {
                          type: "manual",
                          message: "금액을 입력해주세요.",
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
                          selectedAmount === amount ? "selectedButton" : ""
                        }`}
                      >
                        {formatNumber(+amount)}
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
          className={`submitButton text-[16px] font-semibold mt-9 ${allRequiredFieldsFilled ? "bg-main text-white cursor-pointer" : "bg-gray0 text-gray2"}`}
          disabled={!allRequiredFieldsFilled}
        >
          저장
        </button>
      </form>
    </section>
  );
}
