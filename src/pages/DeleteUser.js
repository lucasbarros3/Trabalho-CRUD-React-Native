import React, { useState } from 'react';
import { View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userSenha, setUserSenha] = useState('');

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_name=? AND user_senha=?',
        [userName, userSenha],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário Excluído com Sucesso !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Nome de Usuário e/ou Senha inválido(s) !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <ScrollView keyboardShouldPersistTaps="handled" style={{
              marginLeft: 20
            }}>
       <KeyboardAvoidingView>
          <Mytextinput
            placeholder="Entre com o Nome do Usuário"
            onChangeText={
              (userName) => setUserName(userName)
            }
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder="Entre com a Senha do Usuário"
            onChangeText={
              (userSenha) => setUserSenha(userSenha)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Usuário" customClick={deleteUser} />
        </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteUser;