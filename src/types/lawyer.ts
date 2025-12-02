export interface LawyerValue {
  val: string;
}

export interface Lawyer {
  id: number;
  lawyer_id: LawyerValue;
  lawyer_name: LawyerValue;
  bio: LawyerValue;
  avatar_url: LawyerValue;
  specializations: LawyerValue[];
  created_at: string;
  updated_at: string;
}

export interface LawyerReview {
  id: number;
  lawyer_id: LawyerValue;
  author_id: LawyerValue;
  case_type: "delivery" | string;
  review: LawyerValue;
  created_at: string;
  updated_at: string;
}

export interface UpdateLawyerRequest {
  lawyer_name?: LawyerValue;
  bio?: LawyerValue;
  avatar_url?: LawyerValue;
  specializations?: LawyerValue[];
}

export interface CreateReviewRequest {
  review: LawyerValue;
}

export interface ChangeLawyerIdRequest {
  lawyer_id: LawyerValue;
}
