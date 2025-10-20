// APIが返す正常なデータ構造を定義します。

// ユーザー情報の型
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// 製品情報の型
export interface Product {
  productId: string;
  price: number;
  stock: number;
}

// APIレスポンスの型。成功時と失敗時で型が異なります。
export type ApiResponse =
  | {
      status: 'success';
      data: User | Product;
    }
  | {
      status: 'error';
      errorCode: string;
      message: string;
    };
