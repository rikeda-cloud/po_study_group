import { ResponseData } from './define';
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
  await mockFetch(id);

  return {
    status: 'error',
    data: '処理を完成させ、テストを通るようにしてください',
  };
}
