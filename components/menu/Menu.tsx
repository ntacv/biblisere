import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { StackParamList } from "../../types";
import TouchableContainer from "../button/TouchableContainer";

const ViewMenu = styled(View)<{ visible: string }>`
  background: red;
`;

const Menu = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <ViewMenu>
      <ScrollView>
        <Text>menu</Text>
        <TouchableContainer route="Menu">Menu</TouchableContainer>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text>User page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text>User page</Text>
        </TouchableOpacity>
      </ScrollView>
    </ViewMenu>
  );
};

export default Menu;
