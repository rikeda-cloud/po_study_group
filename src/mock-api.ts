// バックエンドの擬似APIです。不完全なレスポンスを返すことがあります。

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mockFetch(id: number): Promise<any> {
  console.log(`Fetching data for id: ${id}`);
  switch (id) {
    // 正常なユーザーデータ
    case 1:
      return {
        status: 'success',
        data: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          createdAt: '2023-10-27T10:00:00Z',
        },
      };

    // 正常な製品データ
    case 2:
      return {
        status: 'success',
        data: {
          productId: 'prod-12345',
          price: 2980,
          stock: 100,
        },
      };

    // データの一部が欠けている (emailがない)
    case 3:
      return {
        status: 'success',
        data: {
          id: 3,
          name: 'Jane Doe',
          createdAt: '2023-10-27T12:00:00Z',
        },
      };

    // データの方があっていない (priceが文字列)
    case 4:
      return {
        status: 'success',
        data: {
          productId: 'prod-67890',
          price: '3500',
          stock: 50,
        },
      };

    // APIが返すエラーレスポンス
    case 5:
      return {
        status: 'error',
        errorCode: 'NOT_FOUND',
        message: 'The requested resource was not found.',
      };

    // 予期せぬレスポンス形式
    default:
      return { invalid_response: true };
  }
}
