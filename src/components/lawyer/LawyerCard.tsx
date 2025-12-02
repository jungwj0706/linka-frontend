"use client";

import Link from "next/link";
import type { Lawyer, LawyerValue } from "@/types/lawyer";

interface LawyerCardProps {
  lawyer: Lawyer;
  reviewCount?: number;
  averageFee?: string;
}

export default function LawyerCard({
  lawyer,
  reviewCount = 0,
  averageFee = "0만 원",
}: LawyerCardProps) {
  return (
    <div className="bg-[#fafafa] rounded-lg p-6 flex flex-col items-center">
      {/* 아바타 */}
      <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden">
        {lawyer.avatar_url?.val ? (
          <img
            src={lawyer.avatar_url.val}
            alt={lawyer.lawyer_name?.val || "변호사"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300" />
        )}
      </div>

      <h3 className="text-xl font-bold mb-3 text-[#00353D]">
        {lawyer.lawyer_name?.val || "홍길동 변호사"}
      </h3>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {lawyer.specializations && lawyer.specializations.length > 0 ? (
          lawyer.specializations.map((spec: LawyerValue, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-white rounded-full text-sm text-[#00353D] border border-[#00353D]"
            >
              #{spec.val}
            </span>
          ))
        ) : (
          <>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-[#00353D] border border-[#00353D]">
              #중고거래
            </span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-[#00353D] border border-[#00353D]">
              #직거래
            </span>
          </>
        )}
      </div>

      {/* 통계 정보 */}
      <div className="text-center mb-4 space-y-1">
        <p className="text-[#00353D] font-medium">누적 상담: {reviewCount}건</p>
        <p className="text-[#00353D] font-medium">
          사건 수임 기준가: {averageFee}
        </p>
      </div>

      <Link
        href={`/lawyer/${lawyer.id}`}
        className="w-full bg-[#00353D] text-white py-3 rounded-lg font-medium hover:bg-[#004a54] transition-colors text-center"
      >
        변호사 세부 정보 보기
      </Link>
    </div>
  );
}
