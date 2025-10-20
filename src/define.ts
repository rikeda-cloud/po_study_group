// APIエンドポイントのレスポンス型
export interface RawResponseData {
  status_code: 200 | 400 | 404;
  data: RawUser[] | string; // INFO 成功系レスポンスの場合RawUser[]、失敗系レスポンスの場合エラーメッセージ
}

// 整形後のレスポンス型
export interface ResponseData {
  status: "success" | "error";
  data: User[] | string; // INFO successの場合はUser[]、errorの場合はエラーメッセージ
};

// APIエンドポイントがレスポンスするユーザー型
export interface RawUser {
  user_id: number | string;
  friend_ids?: (number | string)[];
  birthday?: string | number; // INFO YYYY-MM-DD or YYYY/MM/DD or UnixTimeStamp
  is_active?: boolean | 1 | 0;
};

// 整形後のユーザー型
export interface User {
  user_id: number;
  friend_ids: number[]; // INFO 空の配列も含む
  birthday: Date; // INFO 誕生日情報が無いユーザーは削除
  // is_activeがTrueまたは1でないユーザーは削除
};
