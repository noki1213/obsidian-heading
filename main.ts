import { MarkdownView, Plugin } from 'obsidian';

interface HeadingInfo {
	level: number;
	text: string;
	number: string;
}

export default class HeadingNumbersPlugin extends Plugin {
	private statusBarItem: HTMLElement;

	async onload() {
		this.statusBarItem = this.addStatusBarItem();

		this.registerEvent(
			this.app.workspace.on('active-leaf-change', () => this.updateStatusBar())
		);
		this.registerEvent(
			this.app.workspace.on('editor-change', () => this.updateStatusBar())
		);
		// カーソル移動を検知
		this.registerDomEvent(document, 'selectionchange', () => this.updateStatusBar());
		this.registerDomEvent(document, 'click', () => this.updateStatusBar());
		this.registerDomEvent(document, 'keyup', () => this.updateStatusBar());
	}

	// カーソル位置までの見出し階層を構築する
	private buildBreadcrumb(lines: string[], upToLine: number): HeadingInfo[] {
		const counters = [0, 0, 0, 0, 0, 0];
		const stack: HeadingInfo[] = [];

		for (let i = 0; i <= upToLine; i++) {
			const match = lines[i].match(/^(#{1,6})\s+(.+)$/);
			if (!match) continue;

			const level = match[1].length;
			const text = match[2].trim();

			// このレベルのカウンターを増やし、深いレベルをリセット
			counters[level - 1]++;
			for (let j = level; j < 6; j++) counters[j] = 0;

			// 番号文字列を組み立て（例: h2 なら "1.2"）
			const number = counters.slice(0, level).join('.');

			// 同じか深いレベルをスタックから削除して追加
			while (stack.length > 0 && stack[stack.length - 1].level >= level) {
				stack.pop();
			}
			stack.push({ level, text, number });
		}

		return stack;
	}

	private updateStatusBar() {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) {
			this.statusBarItem.setText('');
			return;
		}

		const editor = view.editor;
		const cursor = editor.getCursor();
		const lines = editor.getValue().split('\n');
		const headings = this.buildBreadcrumb(lines, cursor.line);

		if (headings.length === 0) {
			this.statusBarItem.setText('');
			return;
		}

		this.statusBarItem.setText(
			headings.map(h => `${h.number} ${h.text}`).join(' > ')
		);
	}

	onunload() {}
}
