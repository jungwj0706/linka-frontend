import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Icon } from "@iconify/react";

type ScammerInfo = {
  info_type: string;
  value: string;
};

interface ScammerInfoFormProps {
  onNext: (infos: ScammerInfo[]) => void;
  onBack: () => void;
  initialData: ScammerInfo[];
}

export default function ScammerInfoForm({
  onNext,
  onBack,
  initialData,
}: ScammerInfoFormProps) {
  const [formData, setFormData] = useState({
    nickname: initialData.find((v) => v.info_type === "nickname")?.value || "",
    accountNumber:
      initialData.find((v) => v.info_type === "accountNumber")?.value || "",
    contact: initialData.find((v) => v.info_type === "contact")?.value || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextClick = () => {
    const infos: ScammerInfo[] = [
      { info_type: "nickname", value: formData.nickname },
      { info_type: "accountNumber", value: formData.accountNumber },
      { info_type: "contact", value: formData.contact },
    ];

    onNext(infos);
  };

  return (
    <div className="min-h-screen text-white">
      <Header />
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            onClick={onBack}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:bg-white/10"
            aria-label="이전"
          >
            <Icon icon="mdi:chevron-left" className="w-18 h-18" />
          </button>

          <button
            onClick={handleNextClick}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:opacity-80"
            aria-label="다음"
          >
            <Icon icon="mdi:chevron-right" className="w-18 h-18" />
          </button>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            onClick={onBack}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto"
            aria-label="이전"
          >
            <Icon icon="mdi:chevron-left" className="w-18 h-18" />
          </button>

          <button
            onClick={handleNextClick}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto"
            aria-label="다음"
          >
            <Icon icon="mdi:chevron-right" className="w-18 h-18" />
          </button>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl mt-40">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">가해자 정보 입력</h1>
            <p className="text-gray-300">
              가해자에 대해 알고 있는 정보를 입력해주세요.
            </p>
            <p className="text-gray-300">
              (<span className="text-red-500">*</span> 표시가 되어있는 필수 항목
              이외는 선택사항입니다)
            </p>
          </div>

          <div className="bg-[#fafafa] rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-3">
                가해자 닉네임 또는 이름 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="가해자의 실명 혹은 가해자가 사용했던 닉네임을 입력해주세요."
                className="w-full px-4 py-3 rounded-lg border border-black text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-3">
                계좌주명
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="가해자의 계좌주명을 입력해주세요."
                className="w-full px-4 py-3 rounded-lg border border-black text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-3">
                연락처
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="가해자의 연락처를 알고있다면 입력해주세요(전화번호, 메신저 ID 등)."
                className="w-full px-4 py-3 rounded-lg border border-black text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
