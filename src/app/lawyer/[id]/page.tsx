"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Lawyer, LawyerReview, LawyerValue } from "@/types/lawyer";
import { lawyerApi } from "@/lib/lawyer-api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LawyerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lawyerId = params.id as string;

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [reviews, setReviews] = useState<LawyerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 변호사 정보 조회
        const lawyerData = await lawyerApi.getLawyerById(lawyerId);
        setLawyer(lawyerData);

        // 리뷰 조회
        const reviewsData = await lawyerApi.getLawyerReviews(Number(lawyerId));
        setReviews(reviewsData);

        setError(null);
      } catch (err) {
        setError("변호사 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId) {
      fetchData();
    }
  }, [lawyerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00353D]"></div>
          <p className="text-[#00353D] mt-4">정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <>
        <Header />
        <div className="h-25"></div>
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">
              {error || "변호사를 찾을 수 없습니다."}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-[#00353D] text-white px-6 py-2 rounded-lg hover:bg-[#004a54]"
            >
              돌아가기
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#00353D] mb-6 hover:underline"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          변호사 검색으로 돌아가기
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-[#00353D] rounded-lg p-6 text-center sticky top-8">
              <div className="w-40 h-40 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
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

              <h2 className="text-2xl font-bold text-white mb-6">
                {lawyer.lawyer_name?.val || "홍길동 변호사"}
              </h2>

              <button className="w-full bg-white text-[#00353D] py-3 rounded-lg font-medium mb-3 hover:bg-gray-100 transition-colors">
                해당 변호사 에게 사건 의뢰하기
              </button>
              <button className="w-full bg-transparent border border-white text-white py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                채팅 문의하기
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="bg-[#00353D] text-white py-4 px-6 rounded-t-lg">
                <h3 className="text-xl font-bold">변호사 세부 정보</h3>
              </div>

              <div className="p-6 border-b">
                <h4 className="text-lg font-bold text-[#00353D] mb-3">
                  인사말
                </h4>
                <p className="text-[#00353D] leading-relaxed whitespace-pre-wrap">
                  {lawyer.bio?.val ||
                    "안녕하세요 변호사 홍길동입니다. 여러분의 억울함이 없도록, 억울한 피해가 없도록 최선을 다해서 도움을 드리겠습니다. 감사합니다"}
                </p>
              </div>

              <div className="p-6 border-b">
                <h4 className="text-lg font-bold text-[#00353D] mb-3">
                  주요 경력
                </h4>
                <div className="space-y-2 text-[#00353D]">
                  <p>[대한변호사협회] 등록 정사법 전문 변호사</p>
                  <p>
                    前(전) 지방 검찰청 소속 검사 출신, 형사 사건 직업 수사 경험
                  </p>
                  <p>대형 로펌 민사/손해배상팀 5년 근무</p>
                  <p>중고거래 사기 사건 200건 이상 전담 해결</p>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-lg font-bold text-[#00353D] mb-3">
                  전문 분야
                </h4>
                <div className="flex flex-wrap gap-3">
                  {lawyer.specializations &&
                  lawyer.specializations.length > 0 ? (
                    lawyer.specializations.map(
                      (spec: LawyerValue, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-4 bg-[#fafafa] rounded-lg min-w-[80px]"
                        >
                          <div className="w-12 h-12 mb-2 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-[#00353D]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-[#00353D] font-medium">
                            {spec.val}
                          </span>
                        </div>
                      ),
                    )
                  ) : (
                    <>
                      {["중고거래", "형사", "민사", "가족법"].map(
                        (item: string, index: number) => (
                          <div
                            key={index}
                            className="flex flex-col items-center p-4 bg-[#fafafa] rounded-lg min-w-[80px]"
                          >
                            <div className="w-12 h-12 mb-2 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-[#00353D]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-[#00353D] font-medium">
                              {item}
                            </span>
                          </div>
                        ),
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 리뷰 섹션 */}
            <div className="bg-white rounded-lg shadow-sm mt-6">
              <div className="bg-[#00353D] text-white py-4 px-6 rounded-t-lg">
                <h3 className="text-xl font-bold">
                  고객 리뷰 ({reviews.length})
                </h3>
              </div>

              <div className="p-6">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    아직 등록된 리뷰가 없습니다.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#00353D]">
                              {review.author_id?.val || "익명"}
                            </span>
                            <span className="px-2 py-1 bg-[#00353D] text-white text-xs rounded">
                              {review.case_type}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString(
                              "ko-KR",
                            )}
                          </span>
                        </div>
                        <p className="text-[#00353D] leading-relaxed">
                          {review.review?.val}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
