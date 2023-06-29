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
		'no-console': 'warn',
		quotes: ['error', 'single'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: [0],
		'react/function-component-definition': [
			2,
			{ namedComponents: 'arrow-function' },
		],
		'react/no-array-index-key': 0,
		semi: ['error', 'always'],
		'import/extensions': 0,
		'eol-last': ['error', 'always'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/react-in-jsx-scope': 'off',
		'no-plusplus': 'off',
		'no-use-before-define': 'off',
		'operator-linebreak': 'off',
		'jsx-quotes': 'off',
		'import/no-unresolved': 0,
	},
};
