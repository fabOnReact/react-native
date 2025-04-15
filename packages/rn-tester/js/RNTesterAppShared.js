import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function PartialSpanInput() {
  // Manteniamo un array di “segmenti” di testo, ognuno con il proprio stile
  const [textSegments, setTextSegments] = useState([]);
  // Manteniamo anche una stringa semplice che rappresenta l’intero testo concatenato (per altri usi).
  const [plainText, setPlainText] = useState('');

  const RANDOM_COLORS = ['red', 'green', 'blue', 'orange', 'purple'];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_COLORS.length);
    return RANDOM_COLORS[randomIndex];
  };

  const onChangeText = newText => {
    // Se l’utente ha aggiunto caratteri alla fine (caso semplificato):
    if (newText.length > plainText.length) {
      // Prendiamo solo il carattere (o i caratteri) aggiunti
      const addedChunk = newText.slice(plainText.length);
      // Creiamo un nuovo componente Text con stile “a caso”
      const newSegment = (
        <Text key={Date.now().toString()} style={{color: getRandomColor()}}>
          {addedChunk}
        </Text>
      );
      // Aggiorniamo lo state aggiungendo il nuovo segment
      setTextSegments(prev => [...prev, newSegment]);
    } else {
      // Caso più complesso: l’utente ha cancellato o ha editato in mezzo.
      // Per semplicità, qui ricostruiamo tutto da zero oppure gestiamo diversamente.
      // Esempio: svuotiamo e ricostruiamo con un solo blocco:
      setTextSegments([
        <Text key={Date.now().toString()} style={{color: getRandomColor()}}>
          {newText}
        </Text>,
      ]);
    }
    // Aggiorniamo la stringa “piana”
    setPlainText(newText);
  };

  return (
    <View style={styles.container}>
      {/* Notare che stiamo usando i children di TextInput 
          per “iniettare” i segmenti di testo con stili diversi. */}
      <TextInput style={styles.input} multiline onChangeText={onChangeText}>
        {plainText}
        {textSegments}
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
