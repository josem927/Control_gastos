import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './Auth/AuthScreen';
import HomeScreen from './HomeScreen';
import IncomeScreen from './app/Incomes';
import ExpenseScreen from './app/Expenses';
import RegisterScreen from './Auth/RegisterScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Iniciar Sesión', headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pantalla Principal', headerShown: false }}
        />
        <Stack.Screen
          name="IncomeScreen"
          component={IncomeScreen}
          options={{ title: 'Añadir Ingresos' }}
        />
        <Stack.Screen
          name="ExpenseScreen"
          component={ExpenseScreen}
          options={{ title: 'Añadir Gastos' }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
