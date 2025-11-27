import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Switch, Alert, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button, Input, Icon } from '@rneui/themed'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

type RootStackParamList = { Home: undefined; Cadastro: undefined; Login: undefined };
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  senha: Yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('Senha obrigatória'),
});

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signInWithEmailAndPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const PasswordAccessory = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} accessibilityLabel={showPassword ? "Esconder senha" : "Mostrar senha"}>
      <Icon 
        type="font-awesome" 
        name={showPassword ? 'eye-slash' : 'eye'} 
        size={22} 
        color="#6B7280" 
      />
    </TouchableOpacity>
  );

  const handleLogin = async (values: typeof validationSchema.default) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(values); 
      if (rememberMe) { 
        await AsyncStorage.setItem('@app_remember_me', 'true');
      } else { 
        await AsyncStorage.removeItem('@app_remember_me');
      }
      navigation.replace('Home'); 
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro desconhecido ao fazer login.";
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Credenciais inválidas. Verifique seu e-mail e senha.";
      } else if (error.code) {
        errorMessage = `Erro: ${error.code.replace('auth/', '').split('-').join(' ')}`;
      }

      Alert.alert("Erro de Login", errorMessage);
      console.error("Erro de Login:", error);
    } finally {
      setLoading(false);
    }
  };

  const myLogo = require('../img/log.jpeg');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={myLogo} 
            style={styles.appLogo} 
            resizeMode="cover" // Alterado para 'cover' para preencher o círculo
          />
        </View>

        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin} 
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                label="E-mail"
                labelStyle={styles.label}
                placeholder="seu.email@exemplo.com"
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#9CA3AF' }}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : ''}
                accessibilityLabel="Campo de entrada para e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Senha"
                labelStyle={styles.label}
                placeholder="Digite sua senha"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#9CA3AF' }}
                rightIcon={<PasswordAccessory />}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry={!showPassword}
                errorMessage={touched.senha && errors.senha ? errors.senha : ''}
                accessibilityLabel="Campo de entrada para senha"
              />
              
              <View style={styles.rememberMeContainer}>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#A3E635" }}
                  thumbColor={rememberMe ? "#4D7C0F" : "#F4F4F5"}
                  onValueChange={setRememberMe}
                  value={rememberMe}
                />
                <Text style={styles.rememberMeText}>Lembrar de mim</Text>
              </View>

              <Button
                title="Entrar"
                buttonStyle={styles.btn}
                titleStyle={styles.btnTitle}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                accessibilityHint="Toque duas vezes para fazer login"
              />
            </>
          )}
        </Formik>
        <Button
          title="Não possui conta? Clique aqui para se Cadastrar"
          onPress={() => navigation.navigate('Cadastro')}
          type="clear"
          titleStyle={styles.btnCadastroTitle}
          containerStyle={styles.btnCadastroContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F0FDF4', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appLogo: {
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    overflow: 'hidden',
    marginBottom: 16,
  
  },
  logo: {
    color: '#1A2E05', 
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#3F3F46', 
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    color: '#3F3F46', 
    fontWeight: '500',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1', 
    paddingHorizontal: 10,
    borderBottomWidth: 1, 
    marginBottom: 5,
  },
  inputStyle: {
    color: '#1E293B', 
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#3F3F46',
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    marginTop: 16,
    backgroundColor: '#65A30D', 
    paddingVertical: 12,
  },
  btnTitle: { 
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnCadastroContainer: {
    marginTop: 16,
  },
  btnCadastroTitle: {
    color: '#4D7C0F', 
    fontSize: 14,
    fontWeight: '500',
  },
});