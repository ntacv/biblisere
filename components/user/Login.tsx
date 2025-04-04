import * as React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { Api } from 'api/apiSwagger';

import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';
import InputContent from 'components/utils/InputContent';

import Logger from 'utils/Logger';

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
			.then((response) => {
				StoreUser.actions.setUser(response.data);
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
			initialValues={{ email: '', password: '' }}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
				<SafeAreaView>
					<ContainerColumnForm>
						<InputContent
							placeholder={t('user:email')}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							style={{ borderColor: errors.email && touched.email ? colors.danger : '' }}
						/>

						<InputContent
							placeholder={t('user:password')}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							secureTextEntry
							style={{ borderColor: errors.password && touched.password ? colors.danger : '' }}
						/>

						<TouchableOpacity onPress={() => alert(t('login:forgotText'))}>
							<TextUnder>{t('login:forgot')}</TextUnder>
						</TouchableOpacity>

						<Button
							label={t('user:submit')}
							background={!errors.email && !errors.password ? colors.primary : colors.locked}
							align="center"
							onPress={() => handleSubmit()}
						/>

						{/* TEST COMPONENT to login as admin */}
						<TouchableOpacity
							onPress={() => {
								login({ email: 'admin@example.com', password: 'myAdmin123&' });
							}}
						>
							<Text>fast login admin</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								login({ email: 'jdoe@example.com', password: 'JohnDoe123!' });
							}}
						>
							<Text>fast login borrow</Text>
						</TouchableOpacity>
					</ContainerColumnForm>
				</SafeAreaView>
			)}
		</Formik>
	);
};
export default Login;

const TextUnder = styled(Text)`
	text-decoration: underline;
`;
const ContainerColumnForm = styled(ContainerColumn)`
	align-items: center;
	gap: ${sizes.padding.in}px;
`;
