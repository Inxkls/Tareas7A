import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const AlbumDetailWithTracksScreen = ({ album, onBack }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const API_KEY = "48892f7efc789e7dd9bb0a144babb23f";

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${album.artist}&album=${album.name}&format=json`
        );
        
        const albumData = response.data.album;
        const trackData = albumData?.tracks?.track;
        let fetchedTracks = [];

        if (Array.isArray(trackData)) {
            fetchedTracks = trackData;
        } else if (trackData) {
            fetchedTracks = [trackData];
        } else if (albumData && albumData.name) {
            // CORRECCIÓN: Si no hay 'tracks', se asume que es un sencillo
            // y se crea una canción a partir de los datos del propio álbum.
            fetchedTracks = [{
                name: albumData.name,
                duration: null,
                '@attr': { rank: 1 }
            }];
        }
        setTracks(fetchedTracks);

      } catch (error) {
        console.error("Error al obtener la lista de canciones", error);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumDetails();
  }, [album.artist, album.name]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>‹ Volver</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        {imageError || !album.image ? (
          <View style={styles.albumImagePlaceholder}>
            <Text style={styles.albumImagePlaceholderText}>♫</Text>
          </View>
        ) : (
          <Image source={{ uri: album.image }} style={styles.albumImage} onError={handleImageError} />
        )}
        <Text style={styles.albumName}>{album.name}</Text>
        <Text style={styles.artistName}>{album.artist}</Text>

        <Text style={styles.sectionTitle}>Canciones</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#B3B3B3" style={styles.loadingIndicator} />
        ) : tracks.length > 0 ? (
          <FlatList
            data={tracks}
            keyExtractor={(item, index) => item['@attr']?.rank?.toString() || `${item.name}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.trackItem}>
                <Text style={styles.trackNumber}>{index + 1}.</Text>
                <Text style={styles.trackName}>{item.name}</Text>
                <Text style={styles.trackDuration}>{item.duration ? `${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}` : ''}</Text>
              </View>
            )}
            style={styles.tracklist}
          />
        ) : (
          <Text style={styles.noTracksText}>No se encontraron canciones para este álbum.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    padding: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  albumImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 20,
  },
  albumImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImagePlaceholderText: {
    fontSize: 80,
    color: '#B3B3B3',
  },
  albumName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 20,
    color: '#B3B3B3',
    marginTop: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  tracklist: {
    width: '100%',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  trackNumber: {
    color: '#B3B3B3',
    marginRight: 10,
    fontSize: 16,
  },
  trackName: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  trackDuration: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  noTracksText: {
      color: '#B3B3B3',
      marginTop: 20,
  }
});

export default AlbumDetailWithTracksScreen;
