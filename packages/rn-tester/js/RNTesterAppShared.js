import * as React from 'react';
import {
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';

const RNTesterApp = () => {
  const [text, setText] = React.useState(
    'a line 1 \n a line 2 \n a line 3 \n a line 4 \n a line 5 \n a line 6 \n a line 7 \n',
  );
  let scrollViewRef = React.useRef(null);
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true);

  const onKeyboardWillShow = () => {
    console.log('onKeyboardWillShow');
    setIsScrollEnabled(false);
    if (scrollViewRef) {
      console.log('scrollToEnd');
      scrollViewRef.scrollTo({x: 0, y: 300});
    }
  };

  function onKeyboardDidShow() {
    console.log('onKeyboardDidShow');
    setIsScrollEnabled(true);
  }

  React.useEffect(() => {
    const subKWS = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const subKDS = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);

    return () => {
      subKWS.remove();
      subKDS.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1, marginTop: 100}} behavior="padding">
      <ScrollView
        ref={ref => (scrollViewRef = ref)}
        keyboardShouldPersistTaps={'handled'}
        maintainVisibleContentPosition={{minIndexForVisible: 1}}>
        <View style={{padding: 12}}>
          <Text style={styles.text}>MESSAGE 1</Text>
          <Text style={styles.text}>MESSAGE 2</Text>
          <Text style={styles.text}>MESSAGE 3</Text>
          <Text style={styles.text}>MESSAGE 4</Text>
          <Text style={styles.text}>MESSAGE 5</Text>
          <Text style={styles.text}>MESSAGE 6</Text>
          <Text style={styles.text}>MESSAGE 7</Text>
          <Text style={styles.text}>MESSAGE 8</Text>
          <Text style={styles.text}>MESSAGE 9</Text>
          <Text style={styles.text}>MESSAGE 10</Text>
          <Text style={styles.text}>MESSAGE 11</Text>
        </View>
        <TextInput
          multiline={true}
          placeholder={'Type something here...'}
          onChangeText={setText}
          value={text}
          scrollEnabled={true}
          style={styles.input}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RNTesterApp;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 40,
  },
  input: {
    height: 50,
  },
});
