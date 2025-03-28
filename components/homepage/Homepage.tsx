import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreSchedules from 'stores/schedules';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { colors, fonts, sizes } from 'styles/Variables';
import { RouteNames } from 'types';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import Footer from 'components/footer/Footer';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

import { useNav } from 'utils/navigation';

const api = new Api();

function Homepage() {
	const navigation = useNav();
	const { t } = useTranslation();

	const services = t('home:content:services', { returnObjects: true }) as string[];

	const books = useStoreMap(StoreBooks.store, (store) => store);
	const schedules = useStoreMap(StoreSchedules.store, (store) => store);

	React.useEffect(() => {
		api.books
			?.booksControllerFindAll({ sort: 'publicationDate', order: 'desc' })
			.then((response) => {
				StoreBooks.actions.setBooks(response.data);
			});
		api.schedules?.schedulesControllerFindAllSchedules().then((response) => {
			StoreSchedules.actions.setSchedules(response.data);
		});
	}, []);

	return (
		<ViewPage header={true}>
			<ScrollViewContent>
				<ImageMainHome source={require('assets/images/mediatheque_espace_lecture.jpg')} />

				<ContainerColumn>
					<Searchbar />

					<TouchableOpacity onPress={() => navigation.navigate(RouteNames.Catalog)}>
						<TitleContent>
							{t('home:titles:news')}
							<Icon
								iconName="arrowRight"
								width={sizes.icons.title}
								height={sizes.icons.title}
								stroke={colors.primary}
							/>
						</TitleContent>
					</TouchableOpacity>
					<ViewNewBooks horizontal={true}>
						{!books.books ? (
							<TextContent>{t('config:loading')}</TextContent>
						) : (
							books.books?.map((book, index) => (
								<View key={index}>
									<ImageBook source={{ uri: book.imageUrl }} />
									<TextContentDate>
										{t('dates:month-year', { val: new Date(book.publicationDate) })}
									</TextContentDate>
								</View>
							))
						)}
					</ViewNewBooks>

					<TitleContent>{t('home:titles:services')}</TitleContent>
					<View>
						{services.map((service, index) => (
							<TextContent key={index}>{service}</TextContent>
						))}
					</View>

					<ViewAccess>
						<TitleContent>
							<Icon
								iconName="mapPin"
								width={sizes.icons.content}
								height={sizes.icons.content}
								stroke={colors.primary}
							/>

							{t('home:titles:times')}
						</TitleContent>

						{schedules.data?.map((schedule) => (
							<TextContent key={schedule.id}>
								{t('home:content:days:' + [schedule.dayNumber - 1]) +
									' - ' +
									schedule.openingTime.hours +
									':' +
									(schedule.openingTime.minutes == 0 ? '00' : schedule.openingTime.minutes) +
									' - ' +
									schedule.closingTime.hours +
									':' +
									(schedule.closingTime.minutes == 0 ? '00' : schedule.closingTime.minutes)}
							</TextContent>
						))}
					</ViewAccess>
				</ContainerColumn>

				<Footer />
			</ScrollViewContent>
		</ViewPage>
	);
}
export default Homepage;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const ImageMainHome = styled(Image)`
	height: ${sizes.height.image}px;
	width: 100%;
	object-fit: cover;
	opacity: 0.87;
`;
const ImageBook = styled(Image)`
	height: ${sizes.height.imageList}px;
	aspect-ratio: 3/4;
	object-fit: contain;
`;
const ViewAccess = styled(View)`
	${styles.PrimaryContainer}
`;
const TitleContent = styled(Text)`
	${styles.fontSubTitle}
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextContentDate = styled(Text)`
	font: ${fonts.content};
	text-align: center;
	font-weight: bold;
`;
const ViewNewBooks = styled(ScrollView)`
	height: ${sizes.height.imageList + 30}px;
`;
