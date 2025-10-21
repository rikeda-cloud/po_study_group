import { RawResponseData, ResponseData, RawUser, User } from './define';
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
  const res: RawResponseData = await mockFetch(id);

  if (res.status_code === 200) {
    const rawUsers: RawUser[] = <RawUser[]>res.data;
    return processOkResponse(rawUsers);
  }

  // INFO StatusCodeが200番以外ならエラーとして処理
  return {
    status: 'error',
    data: String(res.data),
  };
}

async function processOkResponse(rawUsers: RawUser[]): Promise<ResponseData> {
  // INFO 誕生日がnull、または、activeでないユーザーを除外
  const filteredRawUsers = rawUsers.filter(
    (rawUser: RawUser) =>
      rawUser.birthday !== null &&
      (rawUser.is_active === true || rawUser.is_active === 1),
  );

  const users: User[] = [];
  for (const rawUser of filteredRawUsers) {
    const user_id: number = Number(rawUser.user_id);
    const friend_ids: number[] =
      rawUser.friend_ids === null
        ? []
        : rawUser.friend_ids.map((id: string | number) => Number(id));
    const birthday: Date = convertRawBirthdayToBirthday(rawUser.birthday);

    const user: User = { user_id, friend_ids, birthday };
    users.push(user);
  }

  return { status: 'success', data: users };
}

function convertRawBirthdayToBirthday(
  rawBirthday: string | number | null,
): Date {
  if (typeof rawBirthday === 'number') {
    return new Date(rawBirthday * 1000);
  } else if (typeof rawBirthday === 'string') {
    return new Date(rawBirthday);
  }

  // rawBirthdayが 数値 or 文字列 以外の場合は現在時刻のDateを返す
  return new Date();
}
