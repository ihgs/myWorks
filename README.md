# my-work

日々の作業記録を管理するための Web アプリケーションです。日次・月次で作業項目（開始/終了時刻、項目、種別、コメント）を入力・閲覧でき、データはブラウザの IndexedDB に保存されます。[Next.js](https://nextjs.org/) (App Router) で構築されています。

## 主な機能

- **日次入力 (`/`)** — 日付を選んで、その日の作業を `start` / `end` / `item` / `type` / `comment` で記録します。`Ctrl + :` で現在時刻を 15 分単位に丸めて入力できます。
- **月次表示 (`/month`)** — 月単位で各日の作業を一覧表示します。
- **種別管理 (`/type`)** — 作業種別 (Type) のマスタを追加・編集できます。日次入力の `type` で Autocomplete のサジェストとして利用されます。
- **AsciiDoc コメント** — コメント欄は AsciiDoc としてレンダリングされます。
- **GitHub Pages へのデプロイ** — `next.config.js` で静的エクスポート (`output: 'export'`) されています。

## 技術スタック

- [Next.js 14](https://nextjs.org/) (App Router, 静的エクスポート)
- [React 18](https://react.dev/) / TypeScript
- [MUI](https://mui.com/) (`@mui/material`, `@mui/x-date-pickers`)
- [Recoil](https://recoiljs.org/) — グローバル状態管理 (`workListState`)
- [Awilix](https://github.com/jeffijoe/awilix) — `Recorder` の DI コンテナ
- [Dexie](https://dexie.org/) — IndexedDB ラッパー (`myWorks` データベース, `works` / `types` テーブル)
- [react-hook-form](https://react-hook-form.com/) — 入力フォーム
- [Asciidoctor.js](https://asciidoctor.org/) + [html-react-parser](https://github.com/remarkablemark/html-react-parser) — コメントのレンダリング
- [Day.js](https://day.js.org/)
- [Storybook 7](https://storybook.js.org/) — コンポーネントのカタログ

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx              # 日次画面 (Home)
│   ├── month/page.tsx        # 月次画面
│   ├── type/page.tsx         # 種別管理画面
│   ├── layout.tsx            # ルートレイアウト (Header + RecoilRoot)
│   ├── components/           # WorkCard / DailyCard / DateSelector など
│   └── libs/
│       ├── db.ts             # Dexie の DB 定義
│       ├── recorder/         # Recorder インタフェースの実装 (IndexedDb / TypeDb / memory)
│       ├── atoms/            # Recoil atoms
│       └── utils.ts
└── stories/                  # Storybook のストーリー
```

`Recorder<T>` インタフェース (`src/app/interfaces.ts`) を中心に、データアクセス層を Awilix で差し替えられる構造になっています。

## 使い方

開発サーバを起動:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### スクリプト一覧

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバ起動 |
| `npm run build` | 本番ビルド (静的エクスポート) |
| `npm run start` | ビルド済みアプリの起動 |
| `npm run lint` | ESLint 実行 |
| `npm run format` | Prettier で `js/jsx/ts/tsx/json` を整形 |
| `npm run storybook` | Storybook をポート 6006 で起動 |
| `npm run build-storybook` | Storybook の静的ビルド |
| `npm run deploy` | `GITHUB_PAGES=true` でビルドし `gh-pages` で `out/` を公開 |

## デプロイ

GitHub Pages 公開時は `next.config.js` で `basePath` / `assetPrefix` が `/myWorks` に切り替わります。`npm run deploy` でビルドと公開を行います。
