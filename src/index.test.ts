import { processApiResponse } from './index';
import { User, Product } from './api-spec';

describe('processApiResponse', () => {
  // 正常なユーザーデータが返るべきケース
  test('should return a valid user for id 1', async () => {
    const result = await processApiResponse(1);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      const user = result.data as User;
      expect(user.id).toBe(1);
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(user.createdAt).toBeInstanceOf(Date);
    }
  });

  // 正常な製品データが返るべきケース
  test('should return a valid product for id 2', async () => {
    const result = await processApiResponse(2);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      const product = result.data as Product;
      expect(typeof product.productId).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.stock).toBe('number');
    }
  });

  // データが欠けているケース (バリデーションで弾かれるべき)
  test('should return an error for missing data (id 3)', async () => {
    const result = await processApiResponse(3);
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.errorCode).toBe('VALIDATION_ERROR');
    }
  });

  // データ型が違うケース (型変換またはバリデーションで弾かれるべき)
  test('should return a valid product with corrected type for id 4', async () => {
    const result = await processApiResponse(4);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      const product = result.data as Product;
      expect(product.price).toBe(3500);
      expect(typeof product.price).toBe('number');
    }
  });

  // APIがエラーを返したケース
  test('should return a standard API error for id 5', async () => {
    const result = await processApiResponse(5);
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.errorCode).toBe('NOT_FOUND');
    }
  });

  // 予期せぬ形式のレスポンスが来たケース
  test('should return an error for an unexpected response format (id 99)', async () => {
    const result = await processApiResponse(99);
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.errorCode).toBe('VALIDATION_ERROR');
    }
  });
});
