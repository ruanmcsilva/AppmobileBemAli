import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import fundo from '../img/fundo.jpeg';
import { useAuth } from '../components/AuthContext';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  senha: Yup.string().min(8, 'A senha deve ter no mínimo 6 caracteres').required('Senha obrigatória'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuth();

 return (
    <ImageBackground source={fundo} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.logo}>Login</Text>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {

            signIn(values.email, values.senha); 
            console.log('Dados de login:', values);
            navigation.navigate('Home' as never);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                placeholder="Digite seu e-mail"
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'black' }}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.containerInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : ''}
              />
              <Input
                placeholder="Digite sua senha"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: 'black' }}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.containerInput}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                secureTextEntry={true}
                errorMessage={touched.senha && errors.senha ? errors.senha : ''}
              />
              <Button
                title="Entrar"
                buttonStyle={styles.btn}
                titleStyle={styles.bntlogar}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <Button
          title="Não possui conta? Clique aqui para se Cadastrar"
          onPress={() => navigation.navigate('Cadastro')}
          type="clear"
          titleStyle={{ color: 'white' }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    color: '#ffff',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  containerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 0,
  },
  inputStyle: {
    color: 'black',
  },
  btn: {
    width: 200,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: 'black',
  },
  bntlogar: {
    fontSize: 20,
    padding: 10,
  },
});
