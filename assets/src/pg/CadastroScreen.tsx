import React from 'react';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, ScrollView, ImageBackground } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useAuth } from '../components/AuthContext';
import * as Yup from 'yup';
import fundo from '../img/fundo.jpeg';


const regrasValidacaoYup = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  idade: Yup.number().typeError('Digite apenas números').required('Idade é obrigatória').min(1, 'Idade inválida').max(120, 'Idade inválida'),
  sexo: Yup.string().required('Sexo é obrigatório'),
  planeta: Yup.string().required('Planeta é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export default function CadastroScreen () {
  const navigation = useNavigation();
  const { signUp } = useAuth(); 
  return (
    <ImageBackground source={fundo} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <Formik
          initialValues={{ nome: '', email: '', idade: '', sexo: '', planeta: '', senha: '' }}
          validationSchema={regrasValidacaoYup}
          onSubmit={dados => {
            
            signUp(dados); 
            console.log(dados);
            navigation.navigate('Home' as never);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Input
                placeholder="Nome"
                leftIcon={{ name: 'person', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                value={values.nome}
                errorMessage={touched.nome && errors.nome ? errors.nome : ''}
              />
              <Input
                placeholder="E-mail"
                leftIcon={{ name: 'email', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : ''}
              />
              <Input
                placeholder="Idade"
                leftIcon={{ name: 'cake', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('idade')}
                onBlur={handleBlur('idade')}
                value={values.idade}
                keyboardType="numeric"
                errorMessage={touched.idade && errors.idade ? errors.idade : ''}
              />
              <Input
                placeholder="Sexo"
                leftIcon={{ name: 'wc', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('sexo')}
                onBlur={handleBlur('sexo')}
                value={values.sexo}
                errorMessage={touched.sexo && errors.sexo ? errors.sexo : ''}
              />
              <Input
                placeholder="Planeta Favorito"
                leftIcon={{ name: 'public', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('planeta')}
                onBlur={handleBlur('planeta')}
                value={values.planeta}
                errorMessage={touched.planeta && errors.planeta ? errors.planeta : ''}
              />
              <Input
                placeholder="Senha"
                leftIcon={{ name: 'lock', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry
                errorMessage={touched.senha && errors.senha ? errors.senha : ''}
              />
              <Button
                title="Cadastrar"
                onPress={handleSubmit}
                buttonStyle={styles.btn}
              />
              <Button
                title="Já tem conta? Voltar para o Login"
                onPress={() => navigation.navigate('Login')}
                type="clear"
                titleStyle={{ color: 'white' }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  btn: {
    width: 200,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: 'black',
  },
});
