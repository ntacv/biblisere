import * as React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreSchedules from 'stores/schedules';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api, bookStore } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import Button from 'components/button/Button';
import Footer from 'components/footer/Footer';
import ListRow from 'components/list/ListRow';
import TitleContent from 'components/text/TitleContent';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

function Homepage() {
	const navigation = useNav();
	const { t } = useTranslation();
	const [search, setSearch] = React.useState('');

	const services = t('home:content:services', { returnObjects: true }) as string[];
	const access = t('home:access', { returnObjects: true }) as string[];

	const books = useStoreMap(StoreBooks.store, (store) => store);
	const schedules = useStoreMap(StoreSchedules.store, (store) => store);

	const newBooks = books.books?.slice(0, 5).map((book) => book.id);

	React.useEffect(() => {
		bookStore.update();

		api.schedules?.schedulesControllerFindAllSchedules().then((response) => {
			StoreSchedules.actions.setSchedules(response.data);
		});
	}, []);

	return (
		<ViewPage header>
			<ScrollViewContent>
				<ImageMainHome source={require('assets/images/mediatheque_espace_lecture.jpg')} />

				<ContainerColumn>
					<Searchbar
						home
						value={{ search, setSearch }}
						onPress={() => {
							navigation.navigate(RouteNames.CatalogNavigator, {
								screen: RouteNames.Catalog,
								params: { search: search } as any,
							} as any);
						}}
					/>

					{newBooks?.length > 0 && (
						<ListRow
							booksId={newBooks}
							title={t('home:titles:news')}
							onPressTitle={() =>
								navigation.navigate(RouteNames.CatalogNavigator, {
									screen: RouteNames.Catalog,
								} as any)
							}
						/>
					)}
					{schedules.data && (
						<ContainerZone>
							<TitleContent iconStart={IconNames.clock} label={t('home:titles:times')} />
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
					)}

					<ContainerZone>
						<TitleContent iconStart={IconNames.mapPin} label={t('home:titles:access')} />
						<View>
							{access.map((access, index) => (
								<TextContent key={index}>{t('home:access:' + index)}</TextContent>
							))}
						</View>
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
						iconName={IconNames.book}
						onPress={() =>
							navigation.navigate(RouteNames.CatalogNavigator, {
								screen: RouteNames.Catalog,
							} as any)
						}
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
