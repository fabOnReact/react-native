import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';

const ELLIPSIZE_MODES = {
  HEAD: 'head',
  TAIL: 'tail',
  MIDDLE: 'middle',
};

function RNTesterApp() {
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(30);
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [ellipsizeMode, setEllipsizeMode] = useState(ELLIPSIZE_MODES.HEAD);
  const changeFontSize = () => {
    setFontSize(prev => (prev === 20 ? 30 : 20));
  };
  const changeLineHeight = () => {
    setLineHeight(prev => (prev === 30 ? 40 : 30));
  };

  const nestedTextStyles = {
    color: 'red',
    lineHeight,
    fontSize,
  };

  const changeNumberOfLines = () => {
    setNumberOfLines(prev => (prev == 2 ? 1 : 2));
  };

  const changeEllipsizeMode = () => {
    setEllipsizeMode(prev => {
      switch (prev) {
        case ELLIPSIZE_MODES.HEAD:
          return ELLIPSIZE_MODES.TAIL;
        case ELLIPSIZE_MODES.TAIL:
          return ELLIPSIZE_MODES.MIDDLE;
        case ELLIPSIZE_MODES.MIDDLE:
          return ELLIPSIZE_MODES.HEAD;
        default:
          return ELLIPSIZE_MODES.HEAD;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
        React TextView <Text style={nestedTextStyles}>Span</Text>
      </Text>
      <TextInput>Text Input 2</TextInput>
      <Button title="change font size" onPress={changeFontSize} />
      <Button title="change line height" onPress={changeLineHeight} />
      <Button title="change ellipsize mode" onPress={changeEllipsizeMode} />
      <Button title="change number of lines" onPress={changeNumberOfLines} />
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
