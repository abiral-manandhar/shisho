import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from 'axios';


const Food = () => {
  const [recipes, setRecipes] = useState<any>();
  const [error, setError] = useState<any>();

  const fetchEdamameRecipes = async () => {
    const API_ENDPOINT = "https://api.edamam.com/api/recipes/v2";
    const APP_ID = "3cbc3c7a";
    const APP_KEY = "c20c6a318eeef2df0da1867066f61d29";

    const params = {
      q: "chicken",
      type: "any",
      app_id: APP_ID,
      app_key: APP_KEY,
    };

    try {
      const response = await axios.get(API_ENDPOINT, { params });
      setRecipes(response.data);
    } catch (error: any) {
      console.error("Error fetching recipes:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchEdamameRecipes();
  }, []);

  return (
    <View style={styles.container}>
      
      {error && <Text style={styles.errorText}>Error fetching recipes: {error.message}</Text>}
      {recipes ? (
        <View>
          <Text style={styles.title}>Edamame Recipes:</Text>
          {recipes.hits.map((item: any, index: any) => (
            <Text key={index} style={styles.recipeText}>
              {item.recipe.label}
            </Text>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeText: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Food;
