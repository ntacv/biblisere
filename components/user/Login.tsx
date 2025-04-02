import * as React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

import { useStoreMap } from 'effector-react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';

import { Api } from 'api/apiSwagger';

const api = new Api();

const Login = () => {
	const { t } = useTranslation();
	const [id, setId] = React.useState({ email: '', password: '' });

	const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const checkEmail = (email: string) => {
		setId((prev) => ({ ...prev, email: REGEX_EMAIL.test(email) ? email : '' }));
		return REGEX_EMAIL.test(email);
	};
	const checkPassword = (password: string) => {
		setId((prev) => ({ ...prev, password: REGEX_PASSWORD.test(password) ? password : '' }));
		return REGEX_PASSWORD.test(password);
	};

	const login = () => {
		return api.login
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
				console.error('Login error:', error);
			})
			.finally(() => {
				console.log('Login request completed with: ', storeUser);
			});
	};

	React.useEffect(() => {
		api.users?.usersControllerGetMe().then((response) => {
			StoreUser.actions.setUser(response.data);
		});
	}, []);

	return (
		<Formik onSubmit={() => login()} initialValues={{ email: '', password: '' }}>
			{({ handleSubmit }) => (
				<SafeAreaView>
					<TextInput placeholder={t('user:email')} onChangeText={(text) => checkEmail(text)} />
					{/* will become a check input validater */}
					<Text>{!!id.email ? 'Ok' : 'Not valid'}</Text>
					<TextInput
						placeholder={t('user:password')}
						onChangeText={(password) => checkPassword(password)}
					/>
					{/* will become a check input validater */}
					<Text>{!!id.password ? 'Ok' : 'Not valid'}</Text>

					{/* will become a blue/greyed Validate button */}
					{!!id.email && !!id.password ? (
						<TouchableOpacity onPress={() => handleSubmit()}>
							<Text>{t('user:submit')}</Text>
						</TouchableOpacity>
					) : (
						<Text>{t('user:notReady')}</Text>
					)}
				</SafeAreaView>
			)}
		</Formik>
	);
};
export default Login;
