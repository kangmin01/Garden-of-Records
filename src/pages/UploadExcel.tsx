import Header from "../components/Header";

export default function UploadExcel() {
  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="엑셀 업로드" />
      <div>
        <div>
          <h3 className="font-semibold text-[16px] text-gray4 leading-[20px]">
            양식 다운로드
          </h3>
          <span className="font-normal text-[14px] text-gray2 leading-[20px]">
            가지고 계신 축의금 엑셀파일을 양식에 맞춰 등록해주세요.
          </span>
        </div>
        <ol className="rounded-[12px] border-solid border-[1px] border-gray0 p-[12px] font-normal text-[14px] text-gray3">
          <li>1. 양식 다운로드하기</li>
          <li>2. 양식에 맞춰 정보 수정하기</li>
          <li>3. 엑셀 파일 업로드</li>
        </ol>
        <div>
          <span className="font-semibold text-[14px] text-main">
            양식 다운로드
          </span>
        </div>
      </div>
      <div>
        <div></div>
        <form>
          <input type="file" accept=".csv" />
          <button>기록하기</button>
        </form>
      </div>
    </section>
  );
}
