import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6DB432",
      padding: 20,
      borderRadius: 5,
      width: 200,
      justifyContent: 'center',
      alignSelf: 'center'
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;