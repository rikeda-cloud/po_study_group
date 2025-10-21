import { classicNameResolver } from 'typescript';
import { ResponseData, User } from './define';
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
  const response = await mockFetch(id);

  // ステータスコード正常系以外はエラーで返す
  if (response.status_code != 200) {
    if (typeof response.data === "string") {
      return {
        status: `error`,
        data: response.data,
      };
    } else {
      return {
        status: `error`,
        data: `意図していないresponse dataです`,
      };
    }
  }

  // ステータスコード正常かつdataがstringなら
  if (typeof response.data === "string") {
    return {
      status: `success`,
      data: response.data,
    };
  }
  
  // 2025-10-21T09:46:35+00:00
  const res_data: User[] = [];
  for (let item of response.data) {
    // アクティブではない友人は飛ばす
    if (!item.is_active) continue;
    // birthdayの前処理

    // friend_ids関連の前処理
    item.friend_ids = item.friend_ids ? item.friend_ids : []; 
    let fids: number[] = [];
    let i = 0;
    for (let id of item.friend_ids) {
      fids[i] = typeof id === "string" ? Number(id) : id;
      i++;
    }
    // const ret_friends: number[] = item.friend_ids ? typeof item.friend_ids[0] === "string" ? item.friend_ids.map(Number) : item.friend_ids : [];
    res_data.push({
      user_id: typeof item.user_id === "string" ? Number(item.user_id) : item.user_id,
      friend_ids: fids,
      birthday: `a`
    });
  }
 
  return {
    status: `success`,
    data: res_data,
  };
}
