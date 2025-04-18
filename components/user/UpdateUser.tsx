import * as React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native';

import { Formik } from 'formik';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { Api, UpdateUserDto, userStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import InputContent from 'components/utils/InputContent';

import Logger from 'utils/Logger';
import { initialUserFull } from 'utils/UserUtils';

const api = new Api();

const UpdateUser = (props) => {
	const { t } = useTranslation();

	const token = useStoreMap(StoreUser.store, (store) => store.token);
	const user = useStoreMap(StoreUser.store, (store) => store.id);

	const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const formSchema = Yup.object().shape({
		firstName: Yup.string().optional(),
		lastName: Yup.string().optional(),
		email: Yup.string().matches(REGEX_EMAIL, t('user:wrongEmail')).optional(),
		password: Yup.string().matches(REGEX_PASSWORD, t('user:wrongPassword')).optional(),
	});

	const update = ({ ...props }: UpdateUserDto) => {
		Logger.info('update input ', props);
		return api.users
			?.usersControllerUpdate(
				{
					email: !!props.email ? props.email : user.email,
					firstName: !!props.firstName ? props.firstName : user.firstName,
					lastName: !!props.lastName ? props.lastName : user.lastName,
					password: !!props.password ? props.password : undefined,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			.then((response) => {
				Logger.info('update response ', response.data);
				userStore.update();
			})
			.catch((error) => {
				Logger.warn('Error update: ', error);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	return (
		<Formik
			onSubmit={(values) => update(values)}
			validationSchema={formSchema}
			initialValues={initialUserFull}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
				<SafeViewForm>
					<KeyboardView behavior="padding" keyboardVerticalOffset={0}>
						<ContainerColumnForm>
							<TitleContent label={t('user:updateUser')} />

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
							/>

							<Button
								label={t('user:save')}
								onPress={() => {
									handleSubmit();
									props.setEdit(false);
								}}
							/>
						</ContainerColumnForm>
					</KeyboardView>
				</SafeViewForm>
			)}
		</Formik>
	);
};
export default UpdateUser;

const TextUnder = styled(Text)`
	text-decoration: underline;
`;
const SafeViewForm = styled(SafeAreaView)`
	flex: 1;
	flex-direction: row;
`;
const KeyboardView = styled(KeyboardAvoidingView)`
	flex: 1;
`;
const ContainerColumnForm = styled(View)`
	align-items: center;
	gap: ${sizes.padding.in}px;
`;
