import * as React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import StoreAdmin from 'stores/admin';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { Api, CreateUserDto, REGEX_EMAIL, REGEX_PASSWORD, userStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import InputContent from 'components/utils/InputContent';
import renderAlert from 'components/utils/renderAlert';

import Logger from 'utils/Logger';

const api = new Api();

const initialUserFull = { firstName: '', lastName: '', email: '', password: '' };

interface Props {
	setSignup?: (signup: boolean) => void;
	setAddUser?: (addUser: boolean) => void;
	isAdmin?: boolean;
}

const Signup = ({ setSignup, setAddUser, isAdmin }: Props) => {
	const { t } = useTranslation();

	const formSchema = Yup.object().shape({
		firstName: Yup.string().required(t('user:required')),
		lastName: Yup.string().required(t('user:required')),
		email: Yup.string().matches(REGEX_EMAIL, t('user:wrongEmail')).required(t('user:required')),
		password: Yup.string()
			.matches(REGEX_PASSWORD, t('user:wrongPassword'))
			.required(t('user:required')),
	});

	const signup = ({ ...props }: CreateUserDto) => {
		return api.users
			?.usersControllerCreate({
				firstName: props.firstName,
				lastName: props.lastName,
				email: props.email,
				password: props.password,
			})
			.then((response) => {
				// login user after signup
				return api.login
					?.authControllerLogin({
						email: props.email,
						password: props.password,
					})
					.then((response) => {
						StoreUser.actions.setToken(response.data.access_token);
						userStore.update();
						renderAlert(t('login:signup'), t('login:signupSuccess'), t('login:ok'));
					})
					.catch((error) => {
						throw error;
					});
			})
			.catch((error) => {
				Logger.warn('Error login: ', error);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	const signupAdmin = ({ ...props }: CreateUserDto) => {
		return api.users
			?.usersControllerCreate({
				firstName: props.firstName,
				lastName: props.lastName,
				email: props.email,
				password: props.password,
			})
			.then((response) => {
				// if an admin create a use, they do not want to login
				api.admin
					?.adminControllerFindAllUsers({
						headers: { Authorization: `Bearer ${StoreUser.store.getState().token}` },
					})
					.then((response) => {
						StoreAdmin.actions.setUsers(response.data);
						renderAlert(t('login:signup'), t('login:signupSuccess'), t('login:ok'));
						// reset form
						setSignup(false);
					})
					.catch((error) => {
						Logger.warn('Error fetching admin users', error);
					});
			})
			.catch((error) => {
				Logger.warn('Error login: ', error);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	return (
		<Formik
			onSubmit={(values) => {
				isAdmin ? signupAdmin(values) : signup(values);
			}}
			validationSchema={formSchema}
			initialValues={initialUserFull}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm }) => (
				<SafeViewForm>
					<KeyboardView behavior="padding" keyboardVerticalOffset={0}>
						<ContainerColumnForm>
							<TitleContent label={t('login:signup')} />

							<InputContent
								inputError={!!errors.firstName}
								placeholder={t('login:firstName')}
								onChangeText={handleChange('firstName')}
								onBlur={handleBlur('firstName')}
								value={values.firstName}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.lastName}
								placeholder={t('login:lastName')}
								onChangeText={handleChange('lastName')}
								onBlur={handleBlur('lastName')}
								value={values.lastName}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.email}
								placeholder={t('login:email')}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								value={values.email}
								maxLength={sizes.text.length}
							/>

							<InputContent
								inputError={!!errors.password}
								placeholder={t('login:password')}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								maxLength={sizes.text.length}
								secureTextEntry
							/>

							<Button
								label={t('login:submit')}
								background={!errors.email && !errors.password ? colors.primary : colors.locked}
								onPress={() => {
									handleSubmit();
									setAddUser(false);
								}}
							/>
							{!isAdmin && (
								<>
									<Button
										label={t('login:login')}
										iconName={IconNames.user}
										onPress={() => {
											setSignup(false);
										}}
									/>

									{/* TEST COMPONENT to login as admin */}
									<FastLogin
										onPress={() => {
											signup({
												firstName: 'hi',
												lastName: 'you',
												email: 'hi@example.com',
												password: 'myAdmin123&',
											});
										}}
									/>
									<FastLogin onPress={() => {}} />
								</>
							)}
						</ContainerColumnForm>
					</KeyboardView>
				</SafeViewForm>
			)}
		</Formik>
	);
};
export default Signup;

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
const ContainerColumnForm = styled(View)`
	align-items: center;
	gap: ${sizes.padding.in}px;
`;
const FastLogin = styled(TouchableOpacity)`
	padding: ${2 * sizes.padding.main}px;
`;
