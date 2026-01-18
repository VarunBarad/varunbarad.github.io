module.exports = (Prism) => {
	/**
	 * PrismJS Language Definition for Lox
	 *
	 * Lox is the programming language from "Crafting Interpreters" by Robert Nystrom.
	 * https://craftinginterpreters.com/
	 *
	 * You can find the complete language grammar here: https://claude.ai/chat/090b9a8d-60f5-48fe-9ccc-504c01f88a67
	 *
	 * Features:
	 * - C-like syntax with // comments
	 * - Dynamic typing with nil, true, false literals
	 * - Classes with single inheritance using < operator
	 * - Functions declared with 'fun' keyword
	 * - Variables declared with 'var' keyword
	 * - Control flow: if/else, while, for
	 * - Logical operators: and, or
	 * - Built-in: print statement, clock() function
	 *
	 * Made by Claude: https://claude.ai/chat/090b9a8d-60f5-48fe-9ccc-504c01f88a67
	 */
	
	Prism.languages.lox = {
		// Single-line comments only (Lox doesn't have multi-line comments)
		'comment': {
			pattern: /\/\/.*/,
			greedy: true
		},
		
		// String literals (double-quoted, can be multi-line in Lox)
		'string': {
			pattern: /"[^"]*"/,
			greedy: true
		},
		
		// Class names - matches identifier after 'class' keyword or after '<' (inheritance)
		'class-name': [
			{
				// Class declaration: class Foo
				pattern: /(\bclass\s+)\w+/,
				lookbehind: true
			},
			{
				// Inheritance: class Foo < Bar
				pattern: /(\s*<\s*)\w+/,
				lookbehind: true
			}
		],
		
		// Keywords
		'keyword': /\b(?:and|class|else|for|fun|if|nil|or|print|return|super|this|var|while)\b/,
		
		// Boolean literals
		'boolean': /\b(?:true|false)\b/,
		
		// Built-in functions
		'builtin': /\b(?:clock)\b/,
		
		// Function definitions and calls
		'function': {
			pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
			greedy: false
		},
		
		// Numbers - integers and decimals (Lox doesn't support leading/trailing dots)
		'number': /\b\d+(?:\.\d+)?\b/,
		
		// Operators
		'operator': /[!=<>]=?|[-+/*]|(?<=\s)and(?=\s)|(?<=\s)or(?=\s)/,
		
		// Punctuation
		'punctuation': /[{}(),.;]/
	};
};
