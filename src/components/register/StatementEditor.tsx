"use client";
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Icon } from "@iconify/react";

interface StatementEditorProps {
  onSubmit: (statement: string) => void;
  onBack: () => void;
  initialStatement: string;
}

export default function StatementEditor({
  onSubmit,
  onBack,
  initialStatement,
}: StatementEditorProps) {
  const [statement, setStatement] = useState(initialStatement);
  const [charCount, setCharCount] = useState(initialStatement.length);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setStatement(value);
    setCharCount(value.length);
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!statement.trim()) {
      alert("피해 진술서를 작성해주세요.");
      return;
    }

    if (statement.trim().length < 20) {
      alert("피해 상황을 좀 더 자세히 작성해주세요. (최소 20자)");
      return;
    }

    // 중복 제출 방지
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit(statement.trim());
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />

      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-full relative">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="이전"
          >
            <Icon icon="mdi:chevron-left" className="w-22 h-22" />
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !statement.trim()}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 p-4 rounded-full text-white pointer-events-auto hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="다음"
          >
            <Icon icon="mdi:chevron-right" className="w-22 h-22" />
          </button>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mt-32">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">피해 진술서</h1>
            <p className="text-lg mb-2">
              피해 상황을 자유로운 형식으로 상세히 진술해주세요.
            </p>
            <p className="text-lg">
              작성하신 진술은 등록 후 AI가 자동 분석하여 추가 질문을 할
              예정입니다.
            </p>
          </div>

          <div className="bg-[#fafafa] rounded-2xl p-8">
            <div className="border border-[#00353D] rounded-xl p-6 mb-4">
              <textarea
                value={statement}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="피해가 어떻게 발생하였는지, 어떤 거래가 있었는지, 가해자와의 대화 내용 등을 상세히 작성해주세요. 시간 순서대로 정리하면 더 좋습니다."
                className="w-full h-80 resize-none text-gray-800 placeholder-gray-500 focus:outline-none text-base leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "inherit" }}
              />
            </div>

            <div className="flex justify-end">
              <div className="border border-[#00353D] text-[#00353d] px-6 py-2 rounded-lg text-sm font-medium">
                {charCount}자 입력됨
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !statement.trim()}
                className="bg-[#00353D] text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-[#004850] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "등록 중..." : "입력 완료"}
              </button>
            </div>

            {/* 최소 글자수 안내 */}
            {charCount > 0 && charCount < 15 && (
              <div className="mt-4 text-center text-sm text-orange-500">
                최소 15자 이상 작성해주세요. (현재 {charCount}자)
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
