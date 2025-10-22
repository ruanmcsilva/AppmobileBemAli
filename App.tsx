import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { AuthProvider } from "./assets/src/components/AuthContext";
import LoginScreen from "./assets/src/pg/LoginScreen";
import CadastroScreen from "./assets/src/pg/CadastroScreen";
import HomeScreen from "./assets/src/pg/HomeScreen";
import DetalhesScreen from "./assets/src/pg/DetalhesScreen";
import PerfilScreen from "./assets/src/pg/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={ PerfilScreen } options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider> 
  );
}