> Japanese documentation is available below. (日本語ドキュメントは下部にあります)

# Heading Numbers

An Obsidian plugin that numbers headings in LaTeX style (1, 1.1, 1.1.1, ...) and shows the section the cursor is in as a breadcrumb in the status bar.

## Features

### Heading Numbers

- Every heading (H1 through H6) gets a hierarchical number in front of its text: H1 is `1`, H2 under it is `1.1`, H3 under that is `1.1.1`, and so on.
- The counter for a level increases with each heading of that level and resets all deeper levels.
- Numbers appear in both Reading view and Live Preview.
- Numbers are display only. The note's text is not changed.

### Current Section in the Status Bar

- The status bar shows the heading hierarchy that contains the cursor, with each heading's number, for example `1 Introduction > 1.2 Background`.
- It updates as you type, move the cursor, or switch notes.
- It is empty when the cursor is above the first heading or the active view is not a Markdown note.

## Commands and Settings

The plugin has no commands and no settings. It works as soon as it is enabled.

## Installation

### Via BRAT

1. Install the BRAT plugin.
2. Add `noki1213/obsidian-heading` as a beta plugin.

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder named `obsidian-heading` in your vault's `.obsidian/plugins/` directory.
3. Place the downloaded files in that folder.
4. Enable the plugin in Obsidian settings.

---

# Heading Numbers

見出しに LaTeX 風の番号（1, 1.1, 1.1.1, ...）を付け、カーソルのある節をパンくずとしてステータスバーに表示する Obsidian プラグインです。

## 機能

### 見出し番号

- すべての見出し（H1 から H6）の前に階層つきの番号を表示します。H1 は `1`、その下の H2 は `1.1`、さらにその下の H3 は `1.1.1` のようになります。
- 番号は同じレベルの見出しが出るたびに増え、それより深いレベルの番号は 1 からやり直します。
- 閲覧モードとライブプレビューの両方で表示されます。
- 番号は表示だけで、ノートの本文は書き換えません。

### ステータスバーの現在の節

- カーソルのある位置を含む見出しの階層を、番号つきでステータスバーに表示します（例：`1 Introduction > 1.2 Background`）。
- 入力・カーソル移動・ノートの切り替えに合わせて更新されます。
- カーソルが最初の見出しより上にあるときや、Markdown のノート以外を開いているときは何も表示しません。

## コマンドと設定

コマンドと設定はありません。有効にするとそのまま動きます。

## インストール

### BRAT 経由

1. BRAT プラグインをインストールします。
2. `noki1213/obsidian-heading` をベータプラグインとして追加します。

### 手動インストール

1. 最新リリースから `main.js`、`manifest.json`、`styles.css` をダウンロードします。
2. Vault の `.obsidian/plugins/` に `obsidian-heading` フォルダを作成します。
3. ダウンロードしたファイルをそのフォルダに配置します。
4. Obsidian の設定でプラグインを有効にします。
