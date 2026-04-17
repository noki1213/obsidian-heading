## ステータス
- Created: `2026-04-17 20:00:00`
- Status: `In Progress`

## 初回依頼
- Date: `2026-04-17 20:00:00`

マークダウンファイルの見出しに LaTeX 風の番号を自動付与するObsidianプラグインを作る。

機能1: 見出し番号表示
- `# 見出し` → `1. 見出し` のように表示上だけ番号を振る（実際のテキストは変更しない）
- `## 見出し` → `1.1 見出し`（親の#番号を引き継ぐ。2番目の#の中の##は 2.1 から始まる）
- Live View・Reading Mode 両方で表示される
- h1〜h6 まで対応

機能2: ステータスバー表示
- Obsidian 下部ステータスバーに、カーソルが今いる見出し階層をパンくず形式で表示
- 例: `1 見出しA > 1.2 見出しA-2`

## 実装01
- Date: `2026-04-17 20:00:00`
- Model: `claude-sonnet-4-6`

### 実装内容

新規プロジェクト `obsidian-heading` に以下のファイルを作成した。

**プラグイン本体**
- `main.ts`: プラグインのメインコード。`selectionchange` / `click` / `keyup` イベントを監視してステータスバーを更新する。見出し階層はカーソル行までの行を上から走査してカウンターで計算する。
- `styles.css`: CSS カウンターを使って見出し番号を表示する。Reading Mode（`.markdown-preview-view h1` など）と Live View（`.cm-line.HyperMD-header-1` など）の両方に対応。

**注意点**: Live View は CM6 の仮想スクロールのため、超長いドキュメントではCSSカウンターがズレる可能性がある。通常の使用では問題ない。

**ビルド環境**
- `package.json` / `tsconfig.json` / `esbuild.config.mjs`: 標準 Obsidian プラグインのビルド構成
- `manifest.json`: プラグインメタデータ（author: noki）

**CI/CD**
- `.github/workflows/release.yml`: タグプッシュで自動ビルド＆GitHub Release 作成（BRAT インストール用）

### 実装後の確認項目とフィードバック
1. Live View で見出し番号が `1. # 見出し` のように `#` の前に数字が表示されること → `2.# 1` という誤表示。カウンター名 `h2` などが正しく動いていなかった可能性
2. Reading Mode で見出し番号が `1. 見出し` のように表示されること → 未確認
3. 2番目の `#` の中の `##` が `2.1` から始まること → 未確認
4. ステータスバーにパンくずが表示されること → カーソルが見出し行にないと表示されない問題あり

## 実装02
- Date: `2026-04-17 21:00:00`
- Model: `claude-sonnet-4-6`

### 実装内容

フィードバックで2つの問題が判明した。

問題1: Live View で `2.# 1` のような誤表示
- 原因：`.cm-formatting-header`（`#`記号の要素）の `::before` を使っていたため、CSS counter 名 `h1`, `h2` がうまく動いていなかった可能性
- 対処：CSS counter 名を `heading-h1`, `heading-h2` に変更し、`::before` のターゲットを `.cm-line` 自体に変更

問題2: カーソルが見出し行にないと番号が表示されない
- 原因：Obsidian は `.cm-formatting-header`（`#`記号）をカーソルがない行で非表示にするため、その要素の `::before` も見えなくなっていた
- 対処：`.cm-line.HyperMD-header-X::before` を使うよう変更。`.cm-line` は常に DOM に存在するため、カーソル位置に関係なく常時表示される

変更ファイル: `styles.css`（Live View の CSS counter 名変更 + `::before` ターゲット変更）

### 実装後の確認項目とフィードバック
1. Live View でカーソルがない行でも番号が表示されること
2. Live View で番号が正しく `1.`, `1.1`, `2.`, `2.1` のように表示されること
3. Reading Mode でも番号が正しく表示されること
