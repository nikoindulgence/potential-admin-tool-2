# Vercel環境変数の確認と設定

## 現在の500エラーの原因

エラーログを見ると、`/api/backend/users/me`が呼ばれていますが、500エラーが発生しています。

## 確認すべき環境変数

Vercelダッシュボードの「Settings」→「Environment Variables」で以下を確認してください：

### ❌ 設定してはいけない環境変数

以下の環境変数は**設定しないでください**（VercelでFastAPIを直接デプロイする場合）：

- `NEXT_PUBLIC_API_URL` - 設定しない（デフォルトで`/api/v1`が使われます）
- `BACKEND_BASE_URL` - 設定しない（Vercel環境では不要）
- `GCP_SA_JSON` - 設定しない（Cloud Runを使用しない場合）
- `USE_LOCAL_BACKEND` - 設定しない

### ✅ 設定すべき環境変数

以下の環境変数のみ設定してください：

#### Clerk認証設定
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx または pk_live_xxx
CLERK_SECRET_KEY=sk_test_xxx または sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

#### Supabase設定（バックエンド用）
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx
```

#### Clerk認証設定（バックエンド用）
```
CLERK_SECRET_KEY=sk_test_xxx または sk_live_xxx
CLERK_PUBLISHABLE_KEY=pk_test_xxx または pk_live_xxx
CLERK_JWT_ISSUER=https://your-clerk-subdomain.clerk.accounts.dev
```

#### アプリケーション設定
```
DEBUG=false
APP_NAME=ポテンシャル採用評価ログシステム API
CORS_ORIGINS=["https://your-app.vercel.app"]
```

## 環境変数の削除方法

1. Vercelダッシュボードの「Settings」→「Environment Variables」を開く
2. 以下の環境変数が設定されている場合は**削除**してください：
   - `NEXT_PUBLIC_API_URL`（`/api/backend`に設定されている場合）
   - `BACKEND_BASE_URL`
   - `GCP_SA_JSON`
   - `USE_LOCAL_BACKEND`

3. 環境変数を削除したら、**再デプロイ**を実行してください

## 動作確認

環境変数を修正した後：

1. Vercelダッシュボードで「Redeploy」をクリック
2. デプロイ完了後、ブラウザでアプリにアクセス
3. 開発者ツール（F12）の「Network」タブで以下を確認：
   - `/api/v1/users/me` へのリクエストが送信されているか
   - ステータスコードが200になっているか

## トラブルシューティング

### まだ500エラーが発生する場合

1. **Vercelのログを確認**
   - Vercelダッシュボードの「Functions」タブを開く
   - `/api/v1/users/me` のログを確認
   - エラーメッセージの内容を確認

2. **環境変数が正しく設定されているか確認**
   - 特に `CLERK_SECRET_KEY` と `CLERK_JWT_ISSUER` が正しいか
   - `SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` が正しいか

3. **ブラウザの開発者ツールでエラーを確認**
   - Consoleタブでエラーメッセージを確認
   - Networkタブでリクエスト/レスポンスを確認

