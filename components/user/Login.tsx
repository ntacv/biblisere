import * as React from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';

import { Api } from 'api/apiSwagger';

import Logger from 'utils/Logger';
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
		api.login
			?.authControllerLogin({
				email: id.email,
				password: id.password,
			})
			.then((response) => {
				StoreUser.actions.setToken(response.data.access_token);
				return api.users?.usersControllerGetMe({
					headers: { Authorization: `Bearer ${response.data.access_token}` },
				});
			})
			.then((response) => StoreUser.actions.setUser(response.data))
			.catch((error) => {
				Logger.warn('Error login: ', error);
			});

		return true;
	};

	return (
		<SafeAreaView>
			<TextInput placeholder={t('user:input')} onChangeText={(text) => checkEmail(text)} />
			{/* will become a check input validater */}
			<Text>{id.email != '' ? 'Ok' : 'Not valid'}</Text>
			<TextInput
				placeholder={t('user:input')}
				onChangeText={(password) => checkPassword(password)}
			/>
			{/* will become a check input validater */}
			<Text>{id.password != '' ? 'Ok' : 'Not valid'}</Text>
			<TouchableOpacity onPress={() => Alert.alert(t('login:forgot'), t('login:forgotText'))}>
				<TextUnder>{t('login:forgot')}</TextUnder>
			</TouchableOpacity>
			{/* will become a blue/greyed Validate button */}
			{id.email != '' && id.password != '' ? (
				<TouchableOpacity onPress={() => login()}>
					<Text>{t('user:submit')}</Text>
				</TouchableOpacity>
			) : (
				<Text>{t('user:notReady')}</Text>
			)}

			{/* TEST COMPONENT to login as admin */}
			<TouchableOpacity
				onPress={() => {
					setId({ email: 'admin@example.com', password: 'myAdmin123&' });
				}}
			>
				<Text>fast login admin</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					setId({ email: 'jdoe@example.com', password: 'JohnDoe123!' });
				}}
			>
				<Text>fast login borrow</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
export default Login;

const TextUnder = styled(Text)`
	text-decoration: underline;
`;
