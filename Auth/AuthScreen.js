import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor, introduce nombre de usuario y contraseña.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.73:8000/api/login', { //aqui vas a cambiar por tu direccion ip de tu compu buscas ipconfig en tu consola caleth osea solo vas a camboar 192.168 por la tuya
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Autenticación exitosa, navegación a la pantalla Home
        navigation.navigate('Home');
      } else {
        // Autenticación fallida, mostrar mensaje de error según la respuesta de la API
        if (data.error === 'Unauthorized') {
          Alert.alert('Error', 'Credenciales inválidas. Por favor, inténtalo nuevamente.');
        } else {
          Alert.alert('Error', 'Error al iniciar sesión. Por favor, inténtalo nuevamente más tarde.');
        }
      }
    } catch (error) {
      // Error al realizar la solicitud
      console.error('Error al realizar la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente más tarde.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Svg height="160%" width="400%" viewBox="0 0 1440 320" style={[styles.svg, styles.svgTop]} zIndex={-1}>
        <Path fill="#0099ff" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,122.7C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z" />
      </Svg>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="#555"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            placeholderTextColor="#555"
          />
        </View>
        <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert('¿Olvidaste tu contraseña?')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerText} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerButtonText}>¿Aún no tienes una cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </View>

      <Svg height="200%" width="400%" viewBox="0 0 1430 320" style={[styles.svg, styles.svgBottom]} zIndex={-1}>
        <Path fill="#0099ff" d="M0,320H1440V0H0Z" />
        <Path fill="#ffffff" opacity="0.3" d="M0,192L80,197.3C160,203,320,213,480,208C640,203,800,181,960,160C1120,139,1280,117,1360,106.7L1440,96V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        <Path fill="#ffffff" opacity="0.3" d="M0,32L80,58.7C160,85,320,139,480,165.3C640,192,800,192,960,192C1120,192,1280,192,1360,192L1440,192V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        <Path fill="#ffffff" opacity="0.3" d="M0,160L80,154.7C160,149,320,139,480,154.7C640,171,800,213,960,197.3C1120,181,1280,107,1360,69.3L1440,32V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        <Path fill="#ffffff" opacity="0.6" d="M4,320H1440V160Q720,2,1,160Z" />
      </Svg>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  svg: {
    position: 'absolute',
    width: '100%',
  },
  svgTop: {
    top: 0,
  },
  svgBottom: {
    bottom: 0,
  },
  loginContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#555',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
