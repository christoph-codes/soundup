module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		quotes: ['error', 'single'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['tab'],
		'react/function-component-definition': [
			2,
			{ namedComponents: 'arrow-function' },
		],
		'react/no-array-index-key': 0,
		semi: ['error', 'always'],
		'import/extensions': 0,
		'eol-last': ['error', 2],
	},
};
