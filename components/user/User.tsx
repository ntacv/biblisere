import { TouchableOpacity, View, Text } from "react-native";

import { useNav } from "utils/navigation";

const User = () => {
  const navigation = useNav();
  return (
    <View>
      <Text>User</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};
export default User;
