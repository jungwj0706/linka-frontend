import type {
  Lawyer,
  LawyerReview,
  UpdateLawyerRequest,
  CreateReviewRequest,
  ChangeLawyerIdRequest,
} from "@/types/lawyer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const lawyerApi = {
  getMe: async (): Promise<Lawyer> => {
    const response = await fetch(`${API_BASE_URL}/api/lawyers/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch lawyer info");
    }

    return response.json();
  },

  updateMe: async (data: UpdateLawyerRequest): Promise<Lawyer> => {
    const response = await fetch(`${API_BASE_URL}/api/lawyers/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update lawyer info");
    }

    return response.json();
  },

  getLawyerById: async (lawyerId: string): Promise<Lawyer> => {
    const response = await fetch(`${API_BASE_URL}/api/lawyers/${lawyerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch lawyer");
    }

    return response.json();
  },

  changeLawyerId: async (data: ChangeLawyerIdRequest): Promise<Lawyer> => {
    const response = await fetch(
      `${API_BASE_URL}/api/lawyers/change-lawyer-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to change lawyer ID");
    }

    return response.json();
  },

  getLawyerReviews: async (lawyerId: number): Promise<LawyerReview[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/lawyers/${lawyerId}/reviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return response.json();
  },

  createReview: async (
    lawyerId: number,
    data: CreateReviewRequest,
  ): Promise<LawyerReview> => {
    const response = await fetch(
      `${API_BASE_URL}/api/lawyers/${lawyerId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    return response.json();
  },
};
