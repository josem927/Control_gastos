import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Expense = () => {
  return (
    <TouchableOpacity onPress={() => console.log("Gastos")}>
      <Text style={styles.expenseButton}>Gastos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expenseButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 100, // Hace que el botón sea completamente redondo
    paddingVertical: 32, // Ajusta el espaciado vertical para el botón
    paddingHorizontal: 20, // Ajusta el espaciado horizontal para el botón
    backgroundColor: '#FF5733', // Color de fondo del botón "Gastos"
    overflow: 'hidden', // Esto asegura que el botón sea completamente redondo
    elevation: 3, // Sombra para resaltar el botón
    textAlign: 'center', // Alinea el texto en el centro del botón
  },
});

export default Expense;
