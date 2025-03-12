import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { $storeHealth } from "store";
import { useUnit } from "effector-react";
import { ApiHealth } from "types";
import { useEffect } from "react";
import { getApiHealth } from "api/apiHealth";

const User = () => {
  const navigation = useNavigation();
  const storeHealth = useUnit<{ data: ApiHealth }>($storeHealth);
  //console.log(storeHealth);
  //getApiHealth();
  return (
    <View>
      <Text>User</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>Homepage</Text>
        <Text>status: {storeHealth.data?.status}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default User;
