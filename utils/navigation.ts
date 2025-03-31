import { NavigationProp, useNavigation } from '@react-navigation/native';
import { routesType } from 'types';

const useNav = () => useNavigation<NavigationProp<routesType>>();
export default useNav;
