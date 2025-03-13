import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const User = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>User</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>status: </Text>
      </TouchableOpacity>
    </View>
  );
};
export default User;
