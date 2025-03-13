import { NavigationProp, useNavigation } from "@react-navigation/native";

import { routesType } from "types";

export const useNav = () => useNavigation<NavigationProp<routesType>>();
