module.exports = {
	presets: ['babel-preset-expo'],
	plugins: [
		[
			'module-resolver',
			{
				root: [''],
				alias: {
					'@assets': './assets',
					'@components': './components',
					'@localization': './localization',
					'@styles': './styles',
					'@screens': './screens',
					'@utils': './utils',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
