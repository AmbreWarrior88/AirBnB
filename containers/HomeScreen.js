import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      setRooms(response.data.rooms);
    };
    fetchData();
  }, []);

  return (
    <View style={{ margin: 30, alignItems: "center" }}>
      <FlatList
        data={rooms}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <Image
                  source={{ uri: item.photos[0] }}
                  style={{ height: 200, width: 350 }}
                ></Image>
                <Text
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    height: 20,
                    width: 40
                  }}
                >
                  {item.price} €
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text>{item.title}</Text>

                  <Ionicons name="ios-star" style={{ color: "#FFB400" }}>
                    {item.ratingValue}
                  </Ionicons>
                  <Text>{item.reviews} Reviews</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.user.account.photos[0] }}
                    style={{
                      height: 50,
                      width: 50,
                      resizeMode: "contain",
                      borderRadius: 20
                    }}
                  ></Image>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={rooms => {
          return rooms._id;
        }}
      ></FlatList>

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
