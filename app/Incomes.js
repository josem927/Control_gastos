import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const icons = [
    { name: 'home', label: 'Casa' },
    { name: 'shopping-bag', label: 'Ropa' },
    { name: 'car', label: 'Transporte' },
    { name: 'heartbeat', label: 'Salud' },
    { name: 'cutlery', label: 'Restaurante' },
    { name: 'paw', label: 'Mascotas' },
    { name: 'lightbulb-o', label: 'Luz' },
    { name: 'wifi', label: 'Wifi' },
    { name: 'shopping-cart', label: 'Despensa' },
  ];

  const iconColors = {
    home: '#FFA500', // Cambiado a color naranja
    'shopping-bag': '#FFC0CB', // Violeta
    car: '#4169E1', // Azul
    heartbeat: '#F80000', // Rojo
    cutlery: '#32CD32', // Verde
    paw: '#FFD700', // Amarillo
    'lightbulb-o': '#FFF000', // Amarillo
    wifi: '#00FFFF', // Cyan
    'shopping-cart': '#800000', // Marrón
  };

  const getIconColor = iconName => iconColors[iconName] || '#FFFFFF';
  const handleIconPress = icon => {
    setSelectedIcon(icon);
    setModalVisible(true);
  };

  const handleAddIncome = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      setTotalIncome(prevTotalIncome => prevTotalIncome + parsedAmount);
      setAmount('');
      setConcept('');
      setModalVisible(false);
    }
  };

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      setTotalExpenses(prevTotalExpenses => prevTotalExpenses + parsedAmount);
      setTotalIncome(prevTotalIncome => prevTotalIncome - parsedAmount);
      setAmount('');
      setConcept('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      </View>
      <View style={styles.iconsContainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconWrapper}
            onPress={() => handleIconPress(icon)}
          >
            <View style={[styles.iconBackground, { backgroundColor: getIconColor(icon.name) }]}>
              <Icon name={icon.name} size={40} color="#FFF" />
            </View>
            <Text style={styles.iconLabel}>{icon.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.totalAmountContainer}>
        <View style={styles.totalAmountCard}>
          <Text style={styles.totalAmountLabel}>Total de ingresos</Text>
          <Text style={styles.totalAmountValue}>{totalIncome.toFixed(2)}</Text>
        </View>

      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Agregar Ingreso o Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Concepto"
              value={concept}
              onChangeText={text => setConcept(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={amount}
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#008000' }]}
                onPress={handleAddIncome}
              >
                <Text style={styles.modalButtonText}>Agregar Ingreso</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#FF0000' }]}
                onPress={handleAddExpense}
              >
                <Text style={styles.modalButtonText}>Agregar Gasto</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#555', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#81D4FA',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconLabel: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100, 
  },
  totalAmountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },  
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalAmountValue: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', 
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card:{
    
  }
});