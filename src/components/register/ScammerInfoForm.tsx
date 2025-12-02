"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Icon } from "@iconify/react";
import useAuthStore from "@/store/useAuthStore";

type ScammerInfo = {
  info_type: string;
  value: string;
};

interface ScammerInfoFormProps {
  onNext: (infos: ScammerInfo[]) => void;
  onBack: () => void;
  initialData: ScammerInfo[];
}

const SCAMMER_TYPES = [
  { label: "이름", value: "name" },
  { label: "닉네임", value: "nickname" },
  { label: "전화번호", value: "phone" },
  { label: "계좌번호", value: "account" },
  { label: "SNS ID", value: "sns_id" },
];

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;

  console.log("JWT Access Token:", token);

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

export default function ScammerInfoForm({
  onNext,
  onBack,
  initialData,
}: ScammerInfoFormProps) {
  const [fields, setFields] = useState<ScammerInfo[]>(
    initialData.length > 0
      ? initialData
      : [{ info_type: "nickname", value: "" }],
  );

  const handleAddField = () => {
    setFields((prev) => [...prev, { info_type: "name", value: "" }]);
  };

  const handleFieldChange = (
    index: number,
    key: "info_type" | "value",
    value: string,
  ) => {
    setFields((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const handleRemoveField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextClick = () => {
    onNext(fields);
  };

  return (
    <div className="min-h-screen text-white">
      <Header />

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            onClick={onBack}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:bg-white/10"
          >
            <Icon icon="mdi:chevron-left" className="w-18 h-18" />
          </button>

          <button
            onClick={handleNextClick}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:bg-white/10"
          >
            <Icon icon="mdi:chevron-right" className="w-18 h-18" />
          </button>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl mt-40">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">가해자 정보 입력</h1>
            <p className="text-gray-300">아는 만큼 입력해주세요.</p>
            <p className="text-gray-300">
              (타입을 고르고 정보를 입력할 수 있어요)
            </p>
          </div>

          <div className="bg-[#fafafa] rounded-3xl p-8 space-y-6 text-black">
            {/* 동적 필드 */}
            {fields.map((field, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-300 p-4 relative"
              >
                <button
                  className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveField(index)}
                >
                  <Icon icon="mdi:close" />
                </button>

                <label className="block mb-2 font-medium text-gray-700">
                  정보 타입 선택
                </label>
                <select
                  value={field.info_type}
                  onChange={(e) =>
                    handleFieldChange(index, "info_type", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-800"
                >
                  {SCAMMER_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <label className="block mt-4 mb-2 font-medium text-gray-700">
                  내용 입력
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, "value", e.target.value)
                  }
                  placeholder="해당 정보를 입력해주세요."
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 text-gray-800"
                />
              </div>
            ))}

            {/* + 추가 버튼 */}
            <button
              onClick={handleAddField}
              className="w-full py-3 bg-black text-white rounded-xl text-lg hover:bg-gray-800"
            >
              <Icon icon="mdi:plus" className="inline-block mr-2 text-white" />
              정보 추가
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
