import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function PartialSpanInput() {
  const [prevText, setPrevText] = useState('');
  const [newText, setNewText] = useState('');

  const onChangeText = nativeText => {
    const newTextWithRandomStyle = (
      <Text>
        {prevText}
        <Text style={getRandomStyle()}>
          {nativeText[nativeText.length - 1]}
        </Text>
      </Text>
    );
    setNewText(newTextWithRandomStyle);
  };

  useEffect(() => {
    setPrevText(newText);
  }, [newText]);

  const RANDOM_COLORS = ['red', 'green', 'blue', 'orange', 'purple'];
  const getRandomColor = () => {
    return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
  };

  const getRandomStyle = () => {
    return {
      color: getRandomColor(),
      fontSize: Math.floor(Math.random() * 20) + 10,
      fontWeight: Math.random() > 0.5 ? 'bold' : 'normal',
    };
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} multiline onChangeText={onChangeText}>
        {prevText}
        {newText}
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f0f0f0'},
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});
