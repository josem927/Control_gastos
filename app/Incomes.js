import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity, StatusBar, Plataform  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isIncome, setIsIncome] = useState(true);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [balance, setBalance] = useState(0);

  const addExpenseHandler = () => {
    if (title.trim() === '' || amount.trim() === '') {
      return;
    }
    const newExpense = {
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      type: isIncome ? 'income' : 'expense',
    };
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);

    if (isIncome) {
      setBalance(prevBalance => prevBalance + parseFloat(amount));
    } else {
      setBalance(prevBalance => prevBalance - parseFloat(amount));
    }

    setTitle('');
    setAmount('');
    setIsAddModalVisible(false);
    setModalVisible(false);
  };

  const deleteExpenseHandler = id => {
    const expenseToDelete = expenses.find(expense => expense.id === id);
    if (expenseToDelete) {
      if (expenseToDelete.type === 'income') {
        setBalance(prevBalance => prevBalance - expenseToDelete.amount);
      } else {
        setBalance(prevBalance => prevBalance + expenseToDelete.amount);
      }
    }
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

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
    home: '#00000', // Naranja
    'shopping-bag': '#FFC0CB', // Violeta
    car: '#4169E1', // Azul
    heartbeat: '#F80000', // Rojo
    cutlery: '#32CD32', // Verde
    paw: '#FFD700', // Amarillo
    'lightbulb-o': '#FFFF00', // Amarillo
    wifi: '#00FFFF', // Cyan
    'shopping-cart': '#800000', // Marrón
  };
  
  const getIconColor = (iconName) => iconColors[iconName] || '#000';
  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {icons.slice(0, 4).map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconWrapper }
            onPress={() => handleIconPress(icon)}
          >
            <Icon name={icon.name} size={40} color={getIconColor(icon.name)}/>
            <Text style={styles.iconLabel}>{icon.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Saldo: ${balance.toFixed(2)}</Text>
      </View>
      <View style={styles.iconsContainer}>
        {icons.slice(4).map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconWrapper}
            onPress={() => handleIconPress(icon)}
          >
            <Icon name={icon.name} size={40} color={getIconColor(icon.name)} />
            <Text style={styles.iconLabel}>{icon.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={isAddModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Concepto"
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={amount}
              onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancelar" color="red" onPress={() => setIsAddModalVisible(false)} />
              <Button title="Agregar" onPress={addExpenseHandler} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{selectedIcon?.label}</Text>
            <TextInput
              style={styles.input}
              placeholder="Concepto"
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={amount}
              onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
              <Button title="Agregar" onPress={addExpenseHandler} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.roundButton, styles.incomeButton]}
          onPress={() => {
            setIsIncome(true);
            setIsAddModalVisible(true);
          }}
        >
          <Icon name="plus" size={30} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, styles.expenseButton]}
          onPress={() => {
            setIsIncome(false);
            setIsAddModalVisible(true);
          }}
        >
          <Icon name="minus" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  navbar: {
    width: '100%',
    height:'150%',
    height: 50,
    backgroundColor: '#f0f0f0', // Cambiar a un color neutro, por ejemplo, gris claro
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },  
  navbarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic', // Agrega esta línea para establecer la cursiva
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginVertical: 12,
    margin: 5,
    transform: [{ translateX: 5 }],
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
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
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  incomeButton: {
    borderColor: 'green',
  },
  expenseButton: {
    borderColor: 'red',
  },
});

