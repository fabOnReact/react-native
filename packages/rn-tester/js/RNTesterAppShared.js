import * as React from "react";
import { Keyboard, StyleSheet, KeyboardAvoidingView, ScrollView, View, Text, TextInput } from 'react-native';

const RNTesterApp = () => {
  const [text, setText] = React.useState("a line \n a line \n a line \n a line \n a line \n a line \n a line \n");
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true);

  function onKeyboardWillShow() {
    setIsScrollEnabled(false);
  }

  function onKeyboardDidShow() {
    setIsScrollEnabled(true);
  }

  React.useEffect(() => {
    const subKWS = Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
    const subKDS = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);

    return () => {
      subKWS.remove();
      subKDS.remove();
    };
  }, []);
  
  return (
    <KeyboardAvoidingView style={{flex:1, marginTop: 100}} behavior="padding">
				<ScrollView keyboardShouldPersistTaps={'handled'}>
					<View style={{padding: 12}}>
						<Text style={styles.text}>MESSAGE 1</Text>
						<Text style={styles.text}>MESSAGE 2</Text>
						<Text style={styles.text}>MESSAGE 3</Text>
						<Text style={styles.text}>MESSAGE 4</Text>
						<Text style={styles.text}>MESSAGE 5</Text>
						<Text style={styles.text}>MESSAGE 6</Text>                                                            
					</View>
					<TextInput
						multiline={true}
						placeholder={'Type something here...'}
						onChangeText={setText}
						value={text}
            scrollEnabled={true}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
  );
};

export default RNTesterApp;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 40
  }
});
