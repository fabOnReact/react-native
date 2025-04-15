import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';

const ELLIPSIZE_MODES = {
  HEAD: 'head',
  TAIL: 'tail',
  MIDDLE: 'middle',
};

function RNTesterApp() {
  const [fontSize, setFontSize] = useState(10);
  const [multiline, setMultiline] = useState();

  const changeMultiline = () => {
    setMultiline(prev => !prev);
  };

  const changeFontSize = () => {
    setFontSize(prev => prev + 20);
  };

  const nestedTextStyles1 = {
    color: 'red',
    fontSize,
    lineHeight: 10,
    background: 'blue',
    letterSpacing: 5,
    verticalAlign: 'top',
    textTransform: 'uppercase',
    writingDirection: 'rtl',
    userSelect: 'none',
    textAlign: 'center',
    fontWeight: 'italic',
  };

  return (
    <View style={styles.container}>
      <TextInput multiline={multiline} numberOfLines={3} textAlign={'center'}>
        Not controlled <Text style={nestedTextStyles1}>text1</Text>
      </TextInput>
      <Button title="change font size" onPress={changeFontSize} />
      <Button title="change multiline" onPress={changeMultiline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default RNTesterApp;
