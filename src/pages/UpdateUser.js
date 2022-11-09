import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userSenha, setUserSenha] = useState('');
  let [userNascimento, setUserNascimento] = useState('');
  let [userTime, setUserTime] = useState('');
  let updateAllStates = (name, senha, nascimento, time) => {
    setUserName(name);
    setUserSenha(senha);
    setUserNascimento(nascimento);
    setUserTime(time);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_senha,
              res.user_nascimento,
              res.user_time
            );
          } else {
            alert('Usuário não encontrado!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userSenha, userNascimento, userTime);

    if (!inputUserId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!userName) {
      alert('Por favor informe o Nome !');
      return;
    }
    if (!userSenha) {
      alert('Por Favor informe a Senha !');
      return;
    }
    if (!userNascimento) {
      alert('Por Favor informe a Data de Nascimento !');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?,  user_senha=? , user_nascimento=?, user_time=? where user_id=?',
        [userName, userSenha, userNascimento, userTime, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário atualizado com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar o usuário');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Filtro de Usuário" />
              <Mytextinput
                placeholder="Entre com o Código do Usuário"
                style={{ padding: 10 }}
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
              />
              <Mybutton
                title="Buscar Usuário"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Entre com o Nome"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <Mytextinput
                placeholder="Entre com a Senha"
                value={'' + userSenha}
                onChangeText={
                  (userSenha) => setUserSenha(userSenha)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userNascimento}
                placeholder="Entre com a Data de Nascimento"
                onChangeText={
                  (userNascimento) => setUserNascimento(userNascimento)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                value={userTime}
                placeholder="Selecione o Time"
                onChangeText={
                  (userTime) => setUserTime(userTime)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Atualizar Usuário"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;