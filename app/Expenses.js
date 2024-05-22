import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Expenses() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Gastos</Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
