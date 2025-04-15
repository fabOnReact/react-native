import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';

function RNTesterApp() {
  const [fontSize, setFontSize] = useState(10);
  const [multiline, setMultiline] = useState();
  const [value, setValue] = useState('A word. ');
  const [lineHeight, setLineHeight] = useState(10);
  const [letterSpacing, setLetterSpacing] = useState(5);
  const [verticalAlign, setVerticalAlign] = useState('top');
  const [textTransform, setTextTransform] = useState('uppercase');
  const onChangeText = text => setValue(text);

  const changeMultiline = () => {
    setMultiline(prev => !prev);
  };

  const changeFontSize = () => {
    setFontSize(prev => prev + 20);
  };

  const textStyles = {
    fontSize,
    lineHeight,
    letterSpacing,
    verticalAlign,
    textTransform,
    writingDirection: 'rtl',
    userSelect: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const redTextStyles = {
    ...textStyles,
    color: 'red',
  };

  const greedTextStyles = {
    ...textStyles,
    color: 'green',
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        textAlign={'center'}
        numberOfLines={40}
        style={styles.input}
        onChangeText={onChangeText}>
        A very long long long long long{' '}
        <Text style={redTextStyles}>
          {value}
          <Text style={greedTextStyles}>{value}</Text>
        </Text>
      </TextInput>
      <Button title="change font size" onPress={changeFontSize} />
      <Button title="change multiline" onPress={changeMultiline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
  },
});

export default RNTesterApp;
