import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import fundo from '../img/fundo.jpeg';

export default function DetalhesScreen({ route }) {
  
  const { planeta, description, img } = route.params;

  return (
    <ImageBackground source={fundo} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image source={img} style={styles.image} />
          <Text style={styles.title}>{planeta}</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});