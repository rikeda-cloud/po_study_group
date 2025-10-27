# Backend - Cookie & Session Step1

FastAPIを使用したカート機能のバックエンドAPI

## セットアップ

1. 仮想環境を作成
```bash
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
```

2. 依存関係をインストール
```bash
pip install -r requirements.txt
```

3. サーバーを起動
```bash
uvicorn main:app --reload --port 8000
```

## API エンドポイント

- `GET /api/step1/items` - カート情報を取得
- `POST /api/step1/items` - 商品をカートに追加
- `DELETE /api/step1/items/{item_id}` - 商品をカートから削除