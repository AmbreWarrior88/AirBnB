import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("arno@airbnb-api.com");
  const [password, setPassword] = useState("password01");

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#FF5A5F",
        flex: 1
      }}
    >
      <View>
        <Ionicons
          name="ios-home"
          style={{ marginTop: 30, padding: 50, fontSize: 100, color: "white" }}
        ></Ionicons>
        <Text style={{ color: "white", fontSize: 50 }}>Welcome</Text>
      </View>
      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="email"
          placeholderTextColor="white"
          style={styles.input}
          value={email}
          onChange={() => {
            setEmail(text);
          }}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChange={() => {
            setPassword(text);
          }}
        />
        <Button
          title="Login"
          onPress={async () => {
            const response = await axios.post(
              "https://airbnb-api.now.sh/api/user/log_in",
              {
                email,
                password
              }
            );
            setToken(response.data.token);
          }}
        />
        <TouchableOpacity>
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 30,
    color: "white",
    borderBottomColor: "white",
    borderWidth: 2,
    height: 30,
    width: 300
  }
});
