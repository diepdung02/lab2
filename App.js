import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', '='];
  const operators = ['/', '*', '-', '+'];
  const controls = ['C', 'DEL'];

  function calculateResult() {
    try {
      const result = eval(currentNumber).toString();
      setCurrentNumber(result);
    } catch {
      setCurrentNumber('Error');
    }
  }

  function handleInput(buttonPressed) {
    Vibration.vibrate(35);

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        break;
      case 'C':
        setLastNumber('');
        setCurrentNumber('');
        break;
      case '=':
        setLastNumber(currentNumber + '=');
        calculateResult();
        break;
      default:
        if (['+', '-', '*', '/'].includes(buttonPressed)) {
          if (!['+', '-', '*', '/'].includes(currentNumber.slice(-1))) {
            setCurrentNumber(currentNumber + buttonPressed);
          }
        } else {
          setCurrentNumber(currentNumber + buttonPressed);
        }
        break;
    }
  }

  const buttonStyles = (button) => {
    let backgroundColor = darkMode ? '#424242' : '#f1f1f1';
    let minWidth = '31.5%'; 

    if (['+', '-', '*', '/'].includes(button)) {
      backgroundColor = darkMode ? '#00b9d6' : '#00b9d6';
      minWidth = '100%'; 
    } else if (button === '0') {
      minWidth = '50%';
    }

    return {
      backgroundColor,
      width: minWidth,
      height: width * 0.15, 
      borderColor: darkMode ? '#303030' : '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
    };
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={[styles.results, { backgroundColor: darkMode ? '#212121' : '#ffffff' }]}>
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: darkMode ? '#424242' : '#e5e5e5' }]}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={[styles.historyText, { color: darkMode ? '#b5b7bb' : '#7c7c7c' }]}>{lastNumber}</Text>
        <Text style={[styles.resultText, { color: darkMode ? '#00b9d6' : '#00b9d6' }]}>{currentNumber}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.controlsRow}>
          {controls.map((control) => (
            <TouchableOpacity
              key={control}
              style={[styles.button, buttonStyles(control)]}
              onPress={() => handleInput(control)}
            >
              <Text style={[styles.textButton, { color: darkMode ? '#e0e0e0' : '#333' }]}>{control}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.numbersColumn}>
          {numbers.map((number) => (
            <TouchableOpacity
              key={number}
              style={[styles.button, buttonStyles(number)]}
              onPress={() => handleInput(number)}
            >
              <Text style={[styles.textButton, { color: darkMode ? '#e0e0e0' : '#333' }]}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
          
        <View style={styles.operatorsColumn}>
          {operators.map((operator) => (
            <TouchableOpacity
              key={operator}
              style={[styles.operatorButton, buttonStyles(operator)]}
              onPress={() => handleInput(operator)}
            >
              <Text style={[styles.textButton, { color: 'white' }]}>{operator}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  results: {
    width: '100%',
    flex: 2,
    justifyContent: 'flex-end',
    padding: 15,
  },
  resultText: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'right',
  },
  historyText: {
    fontSize: 20,
    textAlign: 'right',
  },
  themeButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonsContainer: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  controlsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  numbersColumn: {
    width: '75%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f1f1f1',
  },
  operatorsColumn: {
    width: '25%',
    justifyContent: 'space-between',
    backgroundColor: '#00b9d6',
  },
  operatorButton: {
    height: width * 0.15,
  },
  button: {
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  textButton: {
    fontSize: 28,
  },
});
