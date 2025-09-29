import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const SearchResultsList = ({ searchResults, onAddAlbum }) => {
  return (
    <FlatList
      data={searchResults}
      keyExtractor={(item, index) => item.mbid ? item.mbid : `${item.artist}-${item.name}-${index}`}
      renderItem={({ item, index }) => {
        const smallImage = (item.image.find(img => img.size === 'medium') || {})['#text'];
        return (
          <View style={styles.searchResultItemContainer}>
            <TouchableOpacity
              style={styles.searchResultItem}
              onPress={() => onAddAlbum(item)}>
              {smallImage ? (
                <Image source={{ uri: smallImage }} style={styles.searchResultImage} />
              ) : (
                <View style={styles.placeholderImage}><Text style={styles.placeholderText}>♫</Text></View>
              )}
              <View style={styles.searchResultTextContainer}>
                <Text style={styles.searchResultName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.searchResultArtist} numberOfLines={1}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  searchResultItemContainer: {
    marginBottom: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
  },
  searchResultImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 24,
  },
  searchResultTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchResultName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultArtist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
});

export default SearchResultsList;