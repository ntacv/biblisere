import * as React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { Api, initialUserLogin, userStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';
import InputContent from 'components/utils/InputContent';

import Logger from 'utils/Logger';

const api = new Api();

const Login = () => {
	const { t } = useTranslation();

	const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const formSchema = Yup.object().shape({
		email: Yup.string().matches(REGEX_EMAIL, t('user:wrongEmail')).required(t('user:required')),
		password: Yup.string()
			.matches(REGEX_PASSWORD, t('user:wrongPassword'))
			.required(t('user:required')),
	});

	const login = ({ email, password }) => {
		return api.login
			?.authControllerLogin({
				email: email,
				password: password,
			})
			.then((response) => {
				StoreUser.actions.setToken(response.data.access_token);
				userStore.update();
			})
			.catch((error) => {
				Logger.warn('Error login: ', error);
				if (error.status === 401) {
					alert(t('login:wrongLogin'));
				} else {
					alert(t('login:serverError'));
				}
			});
	};

	return (
		<Formik
			onSubmit={(values) => login(values)}
			validationSchema={formSchema}
			initialValues={initialUserLogin}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
				<SafeViewForm>
					<KeyboardView behavior="padding" keyboardVerticalOffset={0}>
						<ContainerColumnForm>
							<InputContent
								inputError={!!errors.email}
								placeholder={t('user:email')}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								value={values.email}
								maxLength={sizes.text.length}
							/>

							<InputContent
								inputError={!!errors.password}
								placeholder={t('user:password')}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								maxLength={sizes.text.length}
								secureTextEntry
							/>

							<TouchableOpacity activeOpacity={0.8} onPress={() => alert(t('login:forgotText'))}>
								<TextUnder>{t('login:forgot')}</TextUnder>
							</TouchableOpacity>

							<Button
								label={t('login:submit')}
								background={!errors.email && !errors.password ? colors.primary : colors.locked}
								onPress={() => handleSubmit()}
							/>

							{/* TEST COMPONENT to login as admin */}
							<FastLogin
								onPress={() => {
									login({ email: 'admin@example.com', password: 'myAdmin123&' });
								}}
							/>
							<FastLogin
								onPress={() => {
									login({ email: 'jdoe@example.com', password: 'JohnDoe123!' });
								}}
							/>
						</ContainerColumnForm>
					</KeyboardView>
				</SafeViewForm>
			)}
		</Formik>
	);
};
export default Login;

const TextUnder = styled(Text)`
	text-decoration: underline;
	text-align: center;
`;
const SafeViewForm = styled(SafeAreaView)`
	flex: 1;
	flex-direction: row;
`;
const KeyboardView = styled(KeyboardAvoidingView)`
	flex: 1;
	align-self: center;
`;
const ContainerColumnForm = styled(ContainerColumn)`
	align-items: center;
	gap: ${sizes.padding.in}px;
`;
const FastLogin = styled(TouchableOpacity)`
	padding: ${2 * sizes.padding.main}px;
`;
