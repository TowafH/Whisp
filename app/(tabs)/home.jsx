import React, { useState, useRef } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  TextInput, 
  Button, 
  Text, 
  TouchableWithoutFeedback, 
  Dimensions, 
  ScrollView 
} from 'react-native';

// Import your map images
import map1 from '@/assets/images/map1.png';
import map2 from '@/assets/images/map2.png';
import map3 from '@/assets/images/map3.png';
import map4 from '@/assets/images/map4.png';
import map5 from '@/assets/images/map5.png';

const maps = [map1, map2, map3, map4, map5];

export default function MapWithMarkers() {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [markersPerMap, setMarkersPerMap] = useState([[], [], [], [], []]);
  const [text, setText] = useState('');
  const [selectedPos, setSelectedPos] = useState(null);
  const imageRef = useRef(null);

  const handleImagePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setSelectedPos({ x: locationX, y: locationY });
  };

  const addMarker = () => {
    if (!selectedPos || !text.trim()) return;

    const updatedMarkers = [...markersPerMap];
    updatedMarkers[currentMapIndex] = [
      ...updatedMarkers[currentMapIndex],
      { ...selectedPos, text },
    ];

    setMarkersPerMap(updatedMarkers);
    setText('');
    setSelectedPos(null);
  };

  const deleteMarker = (index) => {
    const updatedMarkers = [...markersPerMap];
    updatedMarkers[currentMapIndex] = updatedMarkers[currentMapIndex].filter((_, i) => i !== index);
    setMarkersPerMap(updatedMarkers);
  };

  const switchMap = (index) => {
    setCurrentMapIndex(index);
    setSelectedPos(null);
  };

  const currentMarkers = markersPerMap[currentMapIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.description}>
        Instructions: Tap on the map to select a position, enter text, and press "Add Marker". You can toggle between maps using the buttons below.
      </Text>

      {/* Map selection buttons */}
      <View style={styles.mapButtons}>
        {maps.map((_, index) => (
          <Button
            key={index}
            title={`Map ${index + 1}`}
            onPress={() => switchMap(index)}
            color={index === currentMapIndex ? '#FFA500' : '#ccc'}
          />
        ))}
      </View>

      <TouchableWithoutFeedback onPress={handleImagePress}>
        <View>
          <Image
            ref={imageRef}
            source={maps[currentMapIndex]}
            style={styles.image}
            resizeMode="contain"
          />

          {selectedPos && (
            <Text style={styles.coordinateText}>
              Selected: x={Math.round(selectedPos.x)}, y={Math.round(selectedPos.y)}
            </Text>
          )}

          {currentMarkers.map((marker, index) => (
            <Text
              key={index}
              style={{
                position: 'absolute',
                left: marker.x,
                top: marker.y,
                backgroundColor: 'rgba(255,255,0,0.7)',
                padding: 2,
                borderRadius: 4,
              }}
            >
              {marker.text}
            </Text>
          ))}
        </View>
      </TouchableWithoutFeedback>

      {/* Input box */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter text for marker"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <Button title="Add Marker" onPress={addMarker} />
      </View>

      {/* Marker list */}
      <View style={styles.markerList}>
        {currentMarkers.length === 0 && <Text>No markers added yet on this map.</Text>}
        {currentMarkers.map((marker, index) => (
          <View key={index} style={styles.markerItem}>
            <Text>
              {marker.text} (x={Math.round(marker.x)}, y={Math.round(marker.y)})
            </Text>
            <Button title="Delete" color="red" onPress={() => deleteMarker(index)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  description: { marginBottom: 10, fontSize: 14, color: '#555' },
  mapButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  image: { width: Dimensions.get('window').width - 40, height: 300 },
  coordinateText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    padding: 4,
    borderRadius: 4,
  },
  inputBox: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8, marginRight: 10 },
  markerList: { marginTop: 20 },
  markerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 6,
  },
});
