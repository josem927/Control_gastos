import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Incomes = () => {
  const navigation = useNavigation();

  const goToIncomeScreen = () => {
    navigation.navigate('IncomeScreen'); 
  };

  return (
    <TouchableOpacity onPress={goToIncomeScreen}>
      <Text style={styles.incomeButton}>Ingresos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  incomeButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 100,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#00913f',
    overflow: 'hidden',
    elevation: 3,
    textAlign: 'center',
  },
});

export default Incomes;
