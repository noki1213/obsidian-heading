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
		// Detect cursor movement
		this.registerDomEvent(document, 'selectionchange', () => this.updateStatusBar());
		this.registerDomEvent(document, 'click', () => this.updateStatusBar());
		this.registerDomEvent(document, 'keyup', () => this.updateStatusBar());
	}

	// Build the heading hierarchy up to the cursor position
	private buildBreadcrumb(lines: string[], upToLine: number): HeadingInfo[] {
		const counters = [0, 0, 0, 0, 0, 0];
		const stack: HeadingInfo[] = [];

		for (let i = 0; i <= upToLine; i++) {
			const match = lines[i].match(/^(#{1,6})\s+(.+)$/);
			if (!match) continue;

			const level = match[1].length;
			const text = match[2].trim();

			// Increment the counter for this level and reset any deeper levels
			counters[level - 1]++;
			for (let j = level; j < 6; j++) counters[j] = 0;

			// Build the number string (e.g. "1.2" for an h2)
			const number = counters.slice(0, level).join('.');

			// Remove entries at the same or deeper level from the stack, then push the new one
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
