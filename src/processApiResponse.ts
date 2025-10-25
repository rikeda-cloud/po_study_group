import { RawUser, ResponseData, User } from './define';
import mockFetch from './mockFetch';

// birthdayからnull、is_activeから0|nullをomitした型
type ActiveRawUser = {
  user_id: number | string;
  friend_ids: (number | string)[] | null; // INFO string型の場合、数値に変換可能な文字列
  birthday: string | number;
  is_active: true | 1;
};

/**
 * APIレスポンスを整形する関数。
 *
 * @param id 取得するデータのID
 * @returns 整形後のレスポンスデータ
 */
export default async function processApiResponse(
  id: number,
): Promise<ResponseData> {
  const res = await mockFetch(id);

  const status = res.status_code === 200 ? 'success' : 'error';

  if (status === 'error')
    return {
      status: status,
      data: res.data as string,
    };

  const rawUsers = res.data as RawUser[];
  return {
    status: status,
    data: rawUsers.filter(isActiveRawUser).map(convertToUser),
  };
}

function isActiveRawUser(e: RawUser): e is ActiveRawUser {
  return (
    e.birthday !== null &&
    e.birthday !== undefined &&
    (e.is_active === true || e.is_active === 1)
  );
}

const convertToUser = (data: ActiveRawUser): User => {
  const convertedUserId =
    typeof data.user_id === 'string'
      ? safeToNumber(data.user_id)
      : data.user_id;

  const convertedFriendIds =
    data.friend_ids === null ? [] : data.friend_ids.map((e) => safeToNumber(e));

  return {
    user_id: convertedUserId,
    friend_ids: convertedFriendIds,
    birthday: convertToDate(data.birthday),
  };
};

const safeToNumber = (value: string | number): number => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) {
    throw new Error(`値が数値に変換できません: ${value}`);
  }
  return num;
};

/**
 * '/'のままだと国際標準時、'-'だと日本時間で変換されるので、'-'に統一する
 * number型の場合、引数は秒単位。new Date()はミリ秒単位での引数を要求しているため、*1000してから渡す
 * 変換失敗時はエラーを投げる
 */
const convertToDate = (birthday: string | number): Date => {
  const date =
    typeof birthday === 'string'
      ? new Date(birthday.replace(/\//g, '-'))
      : new Date(birthday * 1000);
  if (isNaN(date.getTime())) {
    throw new Error(`値が日付に変換できません: ${birthday}`);
  }
  return date;
};
