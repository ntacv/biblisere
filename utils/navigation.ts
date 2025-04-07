import { NavigationProp, useNavigation } from '@react-navigation/native';

import { screensType } from 'utils/screens';

const useNav = () => useNavigation<NavigationProp<screensType>>();
export default useNav;
