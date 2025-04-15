import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';

function RNTesterApp() {
  const [fontSize, setFontSize] = useState(10);
  const [value, setValue] = useState('A nested text ');
  const [lineHeight, setLineHeight] = useState(10);
  const [letterSpacing, setLetterSpacing] = useState(5);
  const [verticalAlign, setVerticalAlign] = useState('top');
  const [textTransform, setTextTransform] = useState('uppercase');

  const onChangeText = text => {
    setLineHeight(prev => prev + 1);
    setLetterSpacing(prev => prev + 1);
    setVerticalAlign(prev => (prev === 'top' ? 'bottom' : 'top'));
    setTextTransform(prev =>
      prev === 'uppercase' ? 'lowercase' : 'uppercase',
    );
    const newSpans = text.split(' ').map((word, index) => (
      <Text key={index} style={getTextStyles()}>
        {word + ' '}
      </Text>
    ));
    setValue(newSpans.join(' '));
  };

  const RANDOM_COLORS = ['red', 'green', 'blue', 'yellow', 'purple'];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_COLORS.length);
    return RANDOM_COLORS[randomIndex];
  };
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

  const getTextStyles = () => {
    return {
      ...textStyles,
      color: getRandomColor(),
      backgroundColor: getRandomColor(),
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        textAlign={'center'}
        numberOfLines={40}
        style={styles.input}
        onChangeText={onChangeText}>
        {value}
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
