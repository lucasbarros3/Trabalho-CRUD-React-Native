import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    height:'100%',
    borderRadius: 3,
    borderColor: 'white',
    backgroundColor: 'white'
  },
});

export default Mytext;