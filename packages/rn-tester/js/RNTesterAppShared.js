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
  const [value, setValue] = React.useState('\u200b');
  // Uncomment this to reproduce the issue
  // const [value, setValue] = React.useState('');
  const [lineHeight, setLineHeight] = React.useState(50);
  const increaseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight + 10);
  };
  const decraseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight - 10);
  };

  // Comment this to reproduce the issue
  React.useEffect(() => {
    if (
      textInputRef.current &&
      value.length === 0 &&
      textInputRef.current.isFocused()
    ) {
      setValue('\u200b');
    }
  }, [value]);

  const onBlurCallback = () => {
    if (value.length === 0 || value === '\u200b') {
      setValue('');
    }
  };

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
