import * as React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

import { useStoreMap } from 'effector-react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import * as Yup from 'yup';

import { Api } from 'api/apiSwagger';

const api = new Api();

const Login = () => {
	const { t } = useTranslation();

	const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;

	const formSchema = Yup.object().shape({
		email: Yup.string().matches(REGEX_EMAIL, t('user:wrongEmail')).required(t('user:required')),
		password: Yup.string()
			.matches(REGEX_PASSWORD, t('user:wrongPassword'))
			.required(t('user:required')),
	});

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const login = ({ email, password }) => {
		return api.login
			?.authControllerLogin({
				email: email,
				password: password,
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
		<Formik
			onSubmit={(values) => login(values)}
			validationSchema={formSchema}
			initialValues={{ email: '', password: '' }}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
				<SafeAreaView>
					<TextInput
						placeholder={t('user:email')}
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						value={values.email}
					/>
					{/* will become a check input validater */}
					<Text>{errors.email && touched.email ? errors.email : 'Ok'}</Text>

					<TextInput
						placeholder={t('user:password')}
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						value={values.password}
						secureTextEntry
					/>
					{/* will become a check input validater */}
					<Text>{errors.password && touched.password ? errors.password : 'Ok'}</Text>

					{/* will become a blue/greyed Validate button */}
					{!errors.email && !errors.password ? (
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
