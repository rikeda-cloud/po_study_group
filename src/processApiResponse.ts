import { ApiResponse } from './api-spec';
import { mockFetch } from './mock-api';

/**
 * APIレスポンスを整形・検証する関数。
 * この関数を改修して、すべてのテストをパスさせてください。
 *
 * @param id 取得するデータのID
 * @returns 整形後のAPIレスポンス
 */
export default async function processApiResponse(
  id: number,
): Promise<ApiResponse> {
  const response = await mockFetch(id);

  // TODO: レスポンスを検証し、ApiResponse型に整形してください。
  // 不正なデータの場合は、適切にエラーレスポンスを生成するか、
  // 例外をスローするなどして、堅牢な実装を目指してください。
  return response;
}
