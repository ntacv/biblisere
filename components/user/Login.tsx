import * as React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';

import { Api } from 'api/apiSwagger';

import { useNav } from 'utils/navigation';

const api = new Api();

const Login = () => {
	const navigation = useNav();
	const { t } = useTranslation();
	const [id, setId] = React.useState({ email: '', password: '' });

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const checkEmail = (email: string) => {
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		if (emailRegex.test(email)) {
			setId((prev) => ({ ...prev, email: email }));
		} else {
			setId((prev) => ({ ...prev, email: '' }));
		}

		return emailRegex.test(email);
	};
	const checkPassword = (password: string) => {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;

		if (passwordRegex.test(password)) {
			setId((prev) => ({ ...prev, password: password }));
		} else {
			setId((prev) => ({ ...prev, password: '' }));
		}

		return passwordRegex.test(password);
	};

	const login = () => {
		console.log('login', id);
		api.login
			?.authControllerLogin({
				email: id.email,
				password: id.password,
			})
			.then((response) => {
				StoreUser.actions.setToken(response.data.access_token);
			})
			.catch((error) => {
				console.error('Login error:', error);
			});

		return true;
	};

	React.useEffect(() => {
		api.users?.usersControllerGetMe().then((response) => {
			StoreUser.actions.setUser(response.data);
		});
	}, []);

	return (
		<SafeAreaView>
			<TextInput placeholder={t('user:input')} onChangeText={(text) => checkEmail(text)} />
			<Text>{id.email != '' ? 'Ok' : 'Not valid'}</Text>
			<TextInput
				placeholder={t('user:input')}
				onChangeText={(password) => checkPassword(password)}
			/>
			<Text>{id.password != '' ? 'Ok' : 'Not valid'}</Text>
			{id.email != '' && id.password != '' ? (
				<TouchableOpacity onPress={() => login()}>
					<Text>{t('user:submit')}</Text>
				</TouchableOpacity>
			) : (
				<Text>{t('user:notReady')}</Text>
			)}
		</SafeAreaView>
	);
};
export default Login;
