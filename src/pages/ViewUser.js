import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Usuário não encontrado !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{
              marginLeft: 20,
            }}>
      <KeyboardAvoidingView>
          <Mytextinput
            placeholder="Entre com o Código do Usuário"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 3,
              borderColor: 'white',
              backgroundColor: 'white' }}
          />
          <Mybutton title="Buscar Usuário" customClick={searchUser} />
          <View
            style={{
              marginLeft: 15,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {userData.user_id}</Text>
            <Text>Nome : {userData.user_name}</Text>
            <Text>Data de Nascimento : {userData.user_nascimento}</Text>
            <Text>Time : {userData.user_time}</Text>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
  );
};

export default ViewUser;