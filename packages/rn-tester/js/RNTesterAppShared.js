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
  const [value, setValue] = useState('span');
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

  const nestedTextStyles = {
    color: 'red',
    fontSize,
    lineHeight,
    background: 'blue',
    letterSpacing,
    verticalAlign,
    textTransform,
    writingDirection: 'rtl',
    userSelect: 'none',
    textAlign: 'center',
    fontWeight: 'italic',
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        textAlign={'center'}
        numberOfLines={50}
        style={styles.input}
        onChangeText={onChangeText}>
        A very long long long long long{' '}
        <Text style={nestedTextStyles}>
          {value}
          <Text style={nestedTextStyles}>
            {value}
            <Text style={nestedTextStyles}>
              {value}
              <Text style={nestedTextStyles}>
                {value}
                <Text style={nestedTextStyles}>
                  {value}
                  <Text style={nestedTextStyles}>{value}</Text>
                </Text>
              </Text>
            </Text>
          </Text>
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
    backgroundColor: 'yellow',
  },
  input: {
    flex: 1,
  },
});

export default RNTesterApp;
