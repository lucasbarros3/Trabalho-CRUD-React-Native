import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
        txn.executeSql(
          'CREATE TABLE table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_senha VARCHAR(20), user_nascimento VARCHAR(10), user_time VARCHAR(100))',
          []
        );
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Usuário"
              btnColor='#6DB432'
              btnIcon="plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Atualizar Usuário"
              btnColor='#353537'
              btnIcon="retweet"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Visualizar Usuário"
              btnColor='#7B7B7D'
              btnIcon="search"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnColor='#768691'
              btnIcon="search-plus"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Excluir Usuário"
              btnColor='#A33A47'
              btnIcon="trash"
              customClick={() => navigation.navigate('Delete')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;