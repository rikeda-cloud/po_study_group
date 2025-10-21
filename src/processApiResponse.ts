import { RawUser, ResponseData, User } from './define';
import mockFetch from './mockFetch';

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
      .filter((e) => e.birthday !== null && e.is_active !== null)
      .map((e) => convertToUser(e)),
  };
}

const convertToUser = (data: RawUser): User => {
  return {
    user_id:
      typeof data.user_id === 'string' ? Number(data.user_id) : data.user_id,
    friend_ids: convertToNumberArray(data.friend_ids),
    birthday: convertToDate(data.birthday as string | number),
  };
};

// BEFORE:
const convertToDate = (birthday: string | number): Date => {
  return typeof birthday === 'string'
    ? new Date(Date.parse(birthday))
    : new Date(birthday);
};
// AFTER: これでも、1問fail
// const convertToDate = (birthday: string | number): Date => {
//   return typeof birthday === 'string'
//     ? new Date(birthday.replace(/\//g, '-'))
//     : new Date(birthday * 1000);
// };

const convertToNumberArray = (
  friend_ids: (number | string)[] | null,
): number[] => {
  if (friend_ids === null) return [];

  return friend_ids.map((e) => {
    return typeof e === 'string' ? Number(e) : e;
  });
};
