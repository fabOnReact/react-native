import * as React from 'react';
import {
  Button,
  Text,
  TextInput,
} from 'react-native';

const RNTesterApp = () => {
  return <TextInputExample />;
};

function TextInputExample() {
  // const [value, setValue] = React.useState('\u200b');
  const [value, setValue] = React.useState('');
  const [lineHeight, setLineHeight] = React.useState(50);
  const increaseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight + 10);
  };
  const decraseLineHeight = () => {
    setLineHeight(prevLineHeight => prevLineHeight - 10);
  };

  /*
  React.useEffect(() => {
    if (value.length === 0) {
      setValue('\u200b');
    }
  }, [value]);
  */

  console.log('lineHeight', lineHeight);
  return (
    <>
      <TextInput
        multiline
        style={{
          backgroundColor: 'red',
          height: 50,
        }}
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

export default RNTesterApp;
