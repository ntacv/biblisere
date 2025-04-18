import * as React from 'react';
import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native';

import { Formik } from 'formik';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreAdmin from 'stores/admin';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { AdminUpdateUserDto, Api, UpdateUserDto, User, userStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import InputContent from 'components/utils/InputContent';

import Logger from 'utils/Logger';
import { initialUserFull } from 'utils/UserUtils';

const api = new Api();

interface Props {
	userId?: number;
	userProp?: User;
	setEdit?: (edit: boolean) => void;
	admin?: boolean;
}

const UpdateUser = ({ userId, userProp, setEdit, admin }: Props) => {
	const { t } = useTranslation();

	const token = useStoreMap(StoreUser.store, (store) => store.token);
	const user = useStoreMap(StoreUser.store, (store) => store.id);
	const adminStore = useStoreMap(StoreAdmin.store, (store) => store.users);

	const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	const formSchema = Yup.object().shape({
		firstName: Yup.string().optional(),
		lastName: Yup.string().optional(),
		email: Yup.string().matches(REGEX_EMAIL, t('user:wrongEmail')).optional(),
		password: Yup.string().matches(REGEX_PASSWORD, t('user:wrongPassword')).optional(),
	});

	// Update personal user info from the user page
	const update = ({ ...props }: UpdateUserDto) => {
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
				userStore.update();
			})
			.catch((error) => {
				Logger.warn('Error update: ', error);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	// Update a user info from the admin page
	const updateAdmin = ({ ...props }: AdminUpdateUserDto) => {
		const toUpdate: AdminUpdateUserDto = {
			email: !!props.email ? props.email : userProp.email,
			firstName: !!props.firstName ? props.firstName : userProp.firstName,
			lastName: !!props.lastName ? props.lastName : userProp.lastName,
		};
		return api.admin
			?.adminControllerUpdateUser(userId, toUpdate, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				//get the updated user and sync it to the admin store
				api.admin
					?.adminControllerFindOneUser(userId, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						StoreAdmin.actions.updateUser(response.data);
					})
					.catch((error) => {
						Logger.warn('Error fetching updated user', error);
					});
			})
			.catch((error) => {
				Logger.warn('Error update: ', error);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	return (
		<Formik
			onSubmit={(values) => {
				admin ? updateAdmin(values) : update(values);
			}}
			validationSchema={formSchema}
			initialValues={initialUserFull}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
				<SafeViewForm>
					<KeyboardView behavior="padding" keyboardVerticalOffset={0}>
						<ContainerColumnForm>
							{!admin && <TitleContent label={t('user:updateUser')} />}

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
									if (!admin) setEdit(false);
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
