import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export async function POST(request: NextRequest) {
  try {
    console.log("=== Next.js API Route: POST /api/case ===");

    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      console.error("FATAL: NEXT_PUBLIC_API_BASE_URL is not defined.");
      return NextResponse.json(
        { error: "서버 설정 오류: 백엔드 주소가 지정되지 않았습니다." },
        { status: 500 },
      );
    }

    // Authorization 헤더 확인
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Authorization header missing or invalid");
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다." },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    console.log("Token received:", token.substring(0, 20) + "...");

    // 요청 바디 파싱
    let body;
    try {
      body = await request.json();
      console.log("Request body received:", JSON.stringify(body, null, 2));
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다." },
        { status: 400 },
      );
    }

    // 필수 필드 검증
    const { case_type, statement, scammer_infos } = body;

    if (!case_type) {
      return NextResponse.json(
        { error: "사건 유형을 선택해주세요." },
        { status: 400 },
      );
    }

    if (!statement || statement.trim() === "") {
      return NextResponse.json(
        { error: "진술서를 작성해주세요." },
        { status: 400 },
      );
    }

    // scammer_infos 없음 빈 배열로 설정
    const requestData = {
      case_type,
      case_type_other: body.case_type_other || null,
      statement: statement.trim(),
      scammer_infos: Array.isArray(scammer_infos) ? scammer_infos : [],
    };

    console.log(
      "Processed request data:",
      JSON.stringify(requestData, null, 2),
    );

    const apiUrl = `${backendUrl}/api/case`;

    console.log("Calling backend API:", apiUrl);

    let backendResponse;
    try {
      backendResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("Backend response status:", backendResponse.status);
    } catch (fetchError) {
      console.error("Failed to reach backend:", fetchError);
      return NextResponse.json(
        {
          error: "백엔드 서버에 연결할 수 없습니다.",
          details:
            fetchError instanceof Error ? fetchError.message : "Unknown error",
        },
        { status: 503 },
      );
    }

    // 백엔드 응답 파싱
    let backendData;
    try {
      backendData = await backendResponse.json();
      console.log(
        "Backend response data:",
        JSON.stringify(backendData, null, 2),
      );
    } catch (e) {
      console.error("Failed to parse backend response:", e);
      return NextResponse.json(
        { error: "백엔드 응답을 처리할 수 없습니다." },
        { status: 500 },
      );
    }

    // 백엔드 에러 처리
    if (!backendResponse.ok) {
      console.error(
        "Backend returned error:",
        backendResponse.status,
        backendData,
      );

      // 422 Validation Error 특별 처리
      if (backendResponse.status === 422) {
        return NextResponse.json(
          {
            error: "입력 데이터 형식이 올바르지 않습니다.",
            detail: backendData.detail,
          },
          { status: 422 },
        );
      }

      // 401 Unauthorized
      if (backendResponse.status === 401) {
        return NextResponse.json(
          { error: "인증에 실패했습니다. 다시 로그인해주세요." },
          { status: 401 },
        );
      }

      // 기타 에러
      return NextResponse.json(
        {
          error:
            backendData.detail ||
            backendData.message ||
            "신고 등록에 실패했습니다.",
          details: backendData,
        },
        { status: backendResponse.status },
      );
    }

    console.log("Case created successfully:", backendData.id);
    return NextResponse.json(backendData, { status: 201 });
  } catch (error) {
    console.error("=== API Route Error ===");
    console.error(error);

    return NextResponse.json(
      {
        error: "서버 오류가 발생했습니다.",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("=== Next.js API Route: GET /api/case ===");

    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      console.error("FATAL: NEXT_PUBLIC_API_BASE_URL is not defined.");
      return NextResponse.json(
        { error: "서버 설정 오류: 백엔드 주소가 지정되지 않았습니다." },
        { status: 500 },
      );
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다." },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const apiUrl = `${backendUrl}/api/case`;

    console.log("Calling backend API:", apiUrl);

    let backendResponse;
    try {
      backendResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (fetchError) {
      console.error("Failed to reach backend:", fetchError);
      return NextResponse.json(
        { error: "백엔드 서버에 연결할 수 없습니다." },
        { status: 503 },
      );
    }

    const data = await backendResponse.json();
    console.log("Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      console.error("Backend error:", data);
      return NextResponse.json(
        { error: data.detail || "케이스 목록을 가져오는데 실패했습니다." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching case:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
