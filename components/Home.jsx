import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const Home = () => {
  const navigation = useNavigation();

  const [pizzas, setPizzas] = useState([]);

  const options = {
    method: "GET",
    url: "https://pizza-and-desserts.p.rapidapi.com/pizzas",
    headers: {
      "X-RapidAPI-Key": "975d89bfc5msha6afce769395d0cp16aad1jsn2c4d822f8378",
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);

      setPizzas(response.data); // Mettre à jour l'état avec les données récupérées
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("about", { pizzaDetails: item })}
    >
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      <Text style={styles.itemVeg}>
        {item.veg ? "Vegetarian" : "Non-Vegetarian"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Pizza Menu</Text>
      <ScrollView>
        <FlashList
          data={pizzas}
          numColumns={2}
          estimatedItemSize={150}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight || 0, // Utilisation de la hauteur de la StatusBar
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "red",
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
    padding: 12,
    margin: 8,
    alignItems: "center",
  },
  itemImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  itemVeg: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default Home;
