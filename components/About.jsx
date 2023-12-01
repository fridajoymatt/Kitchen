import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const About = () => {
  const route = useRoute();
  const { pizzaDetails } = route.params;

  return (
    <View style={styles.container}>
      {/* Affichez d'autres détails de la pizza ici */}

      <Text>A propos de la pizza :</Text>
      <Text>Nom: {pizzaDetails.name}</Text>
      <Text>Description: {pizzaDetails.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default About;
