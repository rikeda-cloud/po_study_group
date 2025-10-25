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

  const rawUers = res.data as RawUser[];
  return {
    status: status,
    data: rawUers
      .filter((e) => e.birthday && e.is_active)
      .map((e) => convertToUser(e as ActiveRawUser)),
  };
}

const convertToUser = (data: ActiveRawUser): User => {
  return {
    user_id:
      typeof data.user_id === 'string' ? Number(data.user_id) : data.user_id,
    friend_ids: convertToNumberArray(data.friend_ids),
    birthday: convertToDate(data.birthday),
  };
};

/**
 * '/'のままだと国際標準時、'-'だと日本時間で変換されるので、'-'に統一する
 * number型の場合、引数は秒単位。new Date()はミリ秒単位での引数を要求しているため、*1000してから渡す
 */
const convertToDate = (birthday: string | number): Date => {
  return typeof birthday === 'string'
    ? new Date(birthday.replace(/\//g, '-'))
    : new Date(birthday * 1000);
};

const convertToNumberArray = (
  friend_ids: (number | string)[] | null,
): number[] => {
  if (friend_ids === null) return [];

  return friend_ids.map((e) => {
    return typeof e === 'string' ? Number(e) : e;
  });
};
