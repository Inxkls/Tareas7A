import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AlbumItem from './AlbumItem';

const MainAlbumList = ({ albums, onDelete, onSelect }) => {
  return (
    <FlatList
      data={albums}
      renderItem={({ item }) => (
        <AlbumItem 
          album={item} 
          onDelete={onDelete}
          onSelect={onSelect}
        />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default MainAlbumList;