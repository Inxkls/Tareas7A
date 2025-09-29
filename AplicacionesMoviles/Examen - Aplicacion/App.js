import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import MainAlbumList from './Components/MainAlbumList';
import SearchResultsList from './Components/SearchResultsList';
import AlbumDetailWithTracksScreen from './Components/AlbumDetailWithTracksScreen';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const isInitialLoad = useRef(true);
  const API_KEY = "48892f7efc789e7dd9bb0a144babb23f";

  // Carga los álbumes y elimina duplicados al iniciar
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const storedAlbums = await AsyncStorage.getItem('albums');
        if (storedAlbums !== null) {
          const parsedAlbums = JSON.parse(storedAlbums);
          // Filtra para asegurar que no haya IDs duplicados
          const uniqueAlbums = parsedAlbums.filter((album, index, self) =>
            index === self.findIndex((a) => a.id === album.id)
          );
          setAlbums(uniqueAlbums);
        }
      } catch (e) {
        console.error("Error al cargar los álbumes", e);
      } finally {
        isInitialLoad.current = false;
      }
    };
    loadAlbums();
  }, []);

  // Guarda los álbumes en AsyncStorage cada vez que cambian
  useEffect(() => {
    if (isInitialLoad.current) return;
    const saveAlbums = async () => {
      try {
        await AsyncStorage.setItem('albums', JSON.stringify(albums));
      } catch (e) {
        console.error("Error al guardar los álbumes", e);
      }
    };
    saveAlbums();
  }, [albums]);

  // Maneja la adición de un nuevo álbum
  const handleAddAlbum = async (item) => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${item.artist}&album=${item.name}&format=json`
      );
      const fullAlbumData = response.data.album;
      
      // CORRECCIÓN CLAVE: Maneja el nombre del artista si viene como objeto
      const artistName = typeof fullAlbumData.artist === 'object' 
        ? fullAlbumData.artist.name 
        : fullAlbumData.artist;

      const albumId = fullAlbumData.mbid || `${artistName}-${fullAlbumData.name}`;

      // Previene agregar álbumes duplicados
      if (albums.some(album => album.id === albumId)) {
        Alert.alert('Álbum Duplicado', 'Este álbum ya está en tu biblioteca.');
        setSearchQuery('');
        setSearchResults([]);
        return;
      }
      
      const newAlbum = {
        id: albumId,
        name: fullAlbumData.name,
        artist: artistName,
        image: (fullAlbumData.image.find(img => img.size === 'extralarge') || {})['#text'],
      };

      setAlbums(prevAlbums => [newAlbum, ...prevAlbums]);
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el álbum. Intenta con otro.');
      console.error("Error al obtener info completa del álbum", error);
    }
  };

  const handleDeleteAlbum = (idToDelete) => {
    Alert.alert(
      "Eliminar Álbum", "¿Estás seguro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => setAlbums(albums.filter(album => album.id !== idToDelete)), style: "destructive" }
      ]
    );
  };

  const searchAlbums = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${API_KEY}&format=json`
      );
      const albumsFound = response.data.results.albummatches.album;
      setSearchResults(albumsFound);
    } catch (error) {
      console.error("Error al buscar álbumes", error);
      setSearchResults([]);
    }
  };

  if (selectedAlbum) {
    return <AlbumDetailWithTracksScreen album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Xerces</Text>
        <Text style={styles.headerSubtitle}>Crea tu biblioteca de álbumes</Text>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar álbum..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchAlbums(text);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {searchResults.length > 0 ? (
        <SearchResultsList searchResults={searchResults} onAddAlbum={handleAddAlbum} />
      ) : albums.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no hay álbumes en tu colección.</Text>
        </View>
      ) : (
        <MainAlbumList albums={albums} onDelete={handleDeleteAlbum} onSelect={setSelectedAlbum} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B3B3B3',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#B3B3B3',
    fontSize: 18,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#282828',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
  },
});

export default App;
