import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreSchedules from 'stores/schedules';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';
import { RouteNames } from 'types';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import Button from 'components/button/Button';
import Footer from 'components/footer/Footer';
import TitleContent from 'components/text/TitleContent';
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
						<TitleContent iconEnd="arrowRight" label={t('home:titles:news')} />
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

					<ContainerZone>
						<TitleContent iconStart="mapPin" label={t('home:titles:times')} />
						<ViewList>
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
						</ViewList>
					</ContainerZone>

					<TitleContent label={t('home:intro')} />
					<TextContent>{t('home:content:presentation')}</TextContent>

					<TitleContent label={t('home:titles:services')} />
					<View>
						{services.map((service, index) => (
							<TextContent key={index}>{service}</TextContent>
						))}
					</View>
					<Button
						label={t('home:explore')}
						iconName="book"
						align="center"
						onPress={() => navigation.navigate(RouteNames.Catalog)}
					/>
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
	margin-bottom: ${sizes.padding.main}px;
`;
const ImageBook = styled(Image)`
	height: ${sizes.height.imageList}px;
	aspect-ratio: 3/4;
	object-fit: contain;
`;
const ViewList = styled(View)`
	align-items: flex-end;
	align-self: center;
	width: auto;
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
