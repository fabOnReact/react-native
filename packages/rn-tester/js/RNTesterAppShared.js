import * as React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const RNTesterApp = () => {
  return (
    <View style={styles.container}>
      <TextInputExampleWithChildren />
      <TextInput />
    </View>
  );
};

function TextInputExampleWithChildren() {
  const textInputRef = React.useRef();
  // The TextInput is a controlled component.
  // The value is the text displayed in the TextInput.
  // Initial value is zero-width-character.
  const [value, setValue] = React.useState('\u200b');
  // Uncomment this to reproduce the issue
  // Instead of using zero-width-character, we use empty string.
  // const [value, setValue] = React.useState('');
  const [lineHeight, setLineHeight] = React.useState(50);
  const increaseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight + 10);
  };
  const decraseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight - 10);
  };

  // Comment this to reproduce the issue
  // When deleting the text, avoid using empty string.
  React.useEffect(() => {
    if (
      textInputRef.current &&
      value.length === 0 &&
      textInputRef.current.isFocused()
    ) {
      setValue('\u200b');
    }
  }, [value]);

  // Comment this to reproduce the issue
  // If the textinput is empty, onBlur we set it to empty string
  // to display the placeholder
  const onBlurCallback = () => {
    if (value.length === 0 || value === '\u200b') {
      setValue('');
    }
  };

  // Comment this to reproduce the issue
  // onFocus we set it to zero-width-character to avoid issues with lineHeight
  const onFocusCallback = () => {
    if (value.length === 0) {
      setValue('\u200b');
    }
  };

  return (
    <>
      <TextInput
        ref={textInputRef}
        multiline
        style={{
          backgroundColor: 'red',
          height: 50,
        }}
        placeholder="my placeholder"
        onBlur={onBlurCallback}
        onFocus={onFocusCallback}
        onChangeText={text => setValue(text)}>
        <Text style={{lineHeight}}>{value}</Text>
      </TextInput>
      <Button
        title="increase line height"
        onPress={() => increaseLineHeight()}
      />
      <Button
        title="decrease line height"
        onPress={() => decraseLineHeight()}
      />
    </>
  );
}

function TextInputExampleLineHeightProp() {
  // const [value, setValue] = React.useState('\u200b');
  // Comment this to reproduce the issue
  const [value, setValue] = React.useState('');
  const [lineHeight, setLineHeight] = React.useState(50);
  const increaseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight + 10);
  };
  const decraseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight - 10);
  };

  // Comment this to reproduce the issue
  // React.useEffect(() => {
  //   if (value.length === 0) {
  //     setValue('\u200b');
  //   }
  // }, [value]);

  return (
    <>
      <TextInput
        multiline
        style={{
          backgroundColor: 'red',
          height: 50,
        }}
        lineHeight={lineHeight}
        value={value}
        onChangeText={text => setValue(text)}
      />
      <Button
        title="increase line height"
        onPress={() => increaseLineHeight()}
      />
      <Button
        title="decrease line height"
        onPress={() => decraseLineHeight()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 200},
});

export default RNTesterApp;
