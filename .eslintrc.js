// https://docs.expo.dev/guides/using-eslint/
import tseslint from '@typescript-eslint/eslint-plugin';

module.exports = {
	extends: ['expo', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'warn',
		// TypeScript
		...tseslint.configs.recommended.rules,
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],

		// React
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		// Import
		'import/no-unresolved': 'error',
		'import/named': 'error',
		'import/default': 'error',
		'import/namespace': 'error',

		// General
		'no-unused-vars': 'warn',
		'prefer-const': 'error',
		'no-console': 'warn',
	},
	ignorePatterns: ['/dist/*'],
};
