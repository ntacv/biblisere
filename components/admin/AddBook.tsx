import * as React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';
import * as Yup from 'yup';

import { Api, bookStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import InputContent from 'components/utils/InputContent';

import Logger from 'utils/Logger';

const api = new Api();

const initialBook = {
	title: '',
	author: '',
	publicationDate: '',
	description: '',
	imageUrl: '',
	quantity: 1,
	categories: '',
	tags: '',
};

interface Props {
	setAddBook?: (addBook: boolean) => void;
}

const AddBook = ({ setAddBook }: Props) => {
	const { t } = useTranslation();

	const formSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		author: Yup.string().required('Author is required'),
		publicationDate: Yup.string().required('Publication date is required'),
		description: Yup.string().required('Description is required'),
		imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
		quantity: Yup.number().optional().min(1, 'Quantity must be at least 1'),
		categories: Yup.string().optional(),
		tags: Yup.string().optional(),
	});

	const submitAddBook = ({ ...props }) => {
		return api.admin
			?.adminControllerCreateBook(
				{
					title: props.title,
					author: props.author,
					publicationDate: props.publicationDate,
					description: props.description,
					imageUrl: props.imageUrl,
					quantity: Number(props.quantity),
					categories: props.categories.split(','),
					tags: props.tags.split(','),
				},
				{
					headers: {
						Authorization: `Bearer ${StoreUser.store.getState().token}`,
					},
				},
			)
			.then((response) => {
				Logger.info('Book created successfully', response.data);
				bookStore.update();
				alert(t('admin:bookCreated'));
			})
			.catch((error) => {
				Logger.warn('Error login: ', error);
				Logger.warn('Error login: ', error.error.errors);
				alert(t(error.status === 401 ? 'login:wrongLogin' : 'login:serverError'));
			});
	};

	return (
		<Formik
			onSubmit={(values) => submitAddBook(values)}
			validationSchema={formSchema}
			initialValues={initialBook}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm }) => (
				<SafeViewForm>
					<KeyboardView behavior="padding" keyboardVerticalOffset={0}>
						<ContainerColumnForm>
							<TitleContent label={t('admin:addBook')} />

							<InputContent
								inputError={!!errors.title}
								placeholder={t('catalog:bookTitle')}
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								value={values.title}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.author}
								placeholder={t('catalog:authors')}
								onChangeText={handleChange('author')}
								onBlur={handleBlur('author')}
								value={values.author}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.publicationDate}
								placeholder={t('catalog:publicationDate')}
								onChangeText={handleChange('publicationDate')}
								onBlur={handleBlur('publicationDate')}
								value={values.publicationDate}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.description}
								placeholder={t('catalog:description')}
								onChangeText={handleChange('description')}
								onBlur={handleBlur('description')}
								value={values.description}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.imageUrl}
								placeholder={t('catalog:imageUrl')}
								onChangeText={handleChange('imageUrl')}
								onBlur={handleBlur('imageUrl')}
								value={values.imageUrl}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.quantity}
								placeholder={t('catalog:quantity')}
								onChangeText={handleChange('quantity')}
								onBlur={handleBlur('quantity')}
								value={values.quantity.toString()}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.categories}
								placeholder={t('catalog:categories')}
								onChangeText={handleChange('categories')}
								onBlur={handleBlur('categories')}
								value={values.categories.toString()}
								maxLength={sizes.text.length}
							/>
							<InputContent
								inputError={!!errors.tags}
								placeholder={t('catalog:tags')}
								onChangeText={handleChange('tags')}
								onBlur={handleBlur('tags')}
								value={values.tags.toString()}
								maxLength={sizes.text.length}
							/>

							<Button
								label={t('login:submit')}
								background={Object.keys(errors).length === 0 ? colors.primary : colors.locked}
								onPress={() => {
									Logger.warn('errors', errors);
									Object.keys(errors).length === 0
										? handleSubmit()
										: alert(Object.values(errors).join(', '));
								}}
							/>
						</ContainerColumnForm>
					</KeyboardView>
				</SafeViewForm>
			)}
		</Formik>
	);
};
export default AddBook;

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
