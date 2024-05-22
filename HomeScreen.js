import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialTransactions = [
  { id: '1', type: 'expense', amount: -50.00, category: 'Compras', date: '2024-05-20' },
  { id: '2', type: 'income', amount: 500.00, category: 'Salario', date: '2024-05-18' },
  { id: '3', type: 'expense', amount: -20.00, category: 'Transporte', date: '2024-05-17' },
];

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [balance, setBalance] = useState(calculateInitialBalance(initialTransactions));

  function calculateInitialBalance(transactions) {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  const chartData = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        data: transactions.map(transaction => transaction.amount),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tu Balance</Text>
        <Text style={styles.balance}>{`$${balance.toFixed(2)}`}</Text>
        <Text style={styles.subtitle}>Transacciones Recientes</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Text style={[styles.transactionAmount, item.type === 'income' ? styles.income : styles.expense]}>
                {item.amount > 0 ? `+$${item.amount.toFixed(2)}` : `-$${Math.abs(item.amount).toFixed(2)}`}
              </Text>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.subtitle}>Gastos a lo largo del tiempo</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#f8f8f8',
            backgroundGradientFrom: '#f8f8f8',
            backgroundGradientTo: '#f8f8f8',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => navigation.navigate('IncomeScreen')}>
          <Icon name="home" size={20} color="#007bff" />
          <Text style={styles.bottomBarText}>Ingresos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => navigation.navigate('ExpenseScreen')}>
          <Icon name="list" size={20} color="#007bff" />
          <Text style={styles.bottomBarText}>Gastos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  income: {
    color: '#4caf50',
  },
  expense: {
    color: '#f44336',
  },
  transactionDetails: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  transactionCategory: {
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomBarButton: {
    alignItems: 'center',
  },
  bottomBarText: {
    fontSize: 12,
    color: '#007bff',
  },
});
