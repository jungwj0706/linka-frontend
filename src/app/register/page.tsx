"use client";

import { useState } from "react";
import CaseTypeSelection from "@/components/register/CaseTypeSelection";
import ScammerInfoForm from "@/components/register/ScammerInfoForm";
// import StatementEditor from "@/components/register/StatementEditor";

type Step = "case-type" | "scammer-info" | "statement";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>("case-type");
  const [formData, setFormData] = useState({
    caseType: "",
    caseTypeOther: "",
    scammerInfos: [] as Array<{ info_type: string; value: string }>,
    statement: "",
  });

  const handleCaseTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, caseType: type }));
    setCurrentStep("scammer-info");
  };

  const handleScammerInfoNext = (
    infos: Array<{ info_type: string; value: string }>,
  ) => {
    setFormData((prev) => ({ ...prev, scammerInfos: infos }));
    setCurrentStep("statement");
  };

  const handleScammerInfoBack = () => {
    setCurrentStep("case-type");
  };

  const handleStatementBack = () => {
    setCurrentStep("scammer-info");
  };

  const handleStatementSubmit = async (statement: string) => {
    setFormData((prev) => ({ ...prev, statement }));

    try {
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          case_type: formData.caseType,
          case_type_other: formData.caseTypeOther,
          statement,
          scammer_infos: formData.scammerInfos,
        }),
      });

      if (response.ok) {
        // 성공 시 케이스 목록 페이지로 이동
        window.location.href = "/cases";
      } else {
        alert("신고 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #00353D 0%, #00252A 100%)",
      }}
    >
      {currentStep === "case-type" && (
        <CaseTypeSelection onSelect={handleCaseTypeSelect} />
      )}
      {currentStep === "scammer-info" && (
        <ScammerInfoForm
          onNext={handleScammerInfoNext}
          onBack={handleScammerInfoBack}
          initialData={formData.scammerInfos}
        />
      )}
      {/* {currentStep === "statement" && (
        <StatementEditor
          onSubmit={handleStatementSubmit}
          onBack={handleStatementBack}
          initialStatement={formData.statement}
        />
      )} */}
    </div>
  );
}
