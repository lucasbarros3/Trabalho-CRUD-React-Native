import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Image,
  StatusBar, 
  Dimensions,
  StyleSheet
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const times = ['Flamengo','Fluminense', 'Vasco', 'Botafogo']
const {width} = Dimensions.get('window');

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userSenha, setUserSenha] = useState('');
  let [userNascimento, setUserNascimento] = useState('');
  let [userTime, setTime] = useState('');

  let register_user = () => {
    console.log(userName, userSenha, userNascimento, userTime);

    if (!userName) {
      alert('Por favor preencha o nome !');
      return;
    }
    if (!userSenha) {
      alert('Por favor preencha a senha');
      return;
    }
    if (!userNascimento) {
      alert('Por favor preencha a data de nascimento !');
      return;
    }
   


    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name,  user_senha, user_nascimento, user_time) VALUES (?,?,?,?)',
        [userName, userSenha, userNascimento, userTime],
        
        (tx, results) => {
          console.log('asd');
          //console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário Registrado com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar o Usuário !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1,
      backgroundColor: '#F2F3F7',
      justifyContent: 'center',
      alignItems:'center',
      marginBottom: 30}}>
      <SelectDropdown
            data={times}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Times'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
      <View style={{justifyContent: 'center',
      alignItems:'center',
      marginBottom: 30}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>
              <Mytextinput
                placeholder="Usuário"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 3,
                  borderColor: 'white',
                  backgroundColor: 'white' }}
              />
              <Mytextinput
                placeholder="Senha"
                onChangeText={
                  (userSenha) => setUserSenha(userSenha)
                }
                keyboardType="text"
                style={{ 
                  height:'50px',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 3,
                  borderColor: 'white',
                  backgroundColor: 'white'}}
              />
              <Mytextinput
                placeholder="Data de Nascimento"
                onChangeText={
                  (userNascimento) => setUserNascimento(userNascimento)
                }
                style={{ borderWidth: 1,
                  padding: 10,
                  borderRadius: 3,
                  borderColor: 'white',
                  backgroundColor: 'white'}}
              />
              <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
              <Mybutton title="Salvar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      width,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
      paddingBottom: '20%',
    },
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },
  
    dropdown1BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  });


export default RegisterUser;