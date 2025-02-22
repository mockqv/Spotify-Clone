import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import searchItems from '../../../http/search/searchItems';
import i18n from '../../Constants/i18n';
import { height, width } from '../../Constants/measures';
import { StatusBar } from 'expo-status-bar';

type SearchResult = {
  id: string;
  name: string;
  image: string;
  author?: string;
  type: 'artist' | 'song' | 'playlist';
};

const MAX_HISTORY_SIZE = 8;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;
    executeSearch(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function executeSearch(query: string) {
    const searchResults = await searchItems(query);
    if (searchResults) {
      const allResults: SearchResult[] = [
        ...searchResults.artists.map(a => ({ ...a, type: 'artist' })),
        ...searchResults.songs.map(s => ({ ...s, type: 'song' })),
        ...searchResults.playlists.map(p => ({ ...p, type: 'playlist' })),
      ];
      setResults(allResults);
    }
  }

  async function saveHistory(newHistory: SearchResult[]) {
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  }

  async function loadHistory() {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  function addToHistory(item: SearchResult) {
    const updatedHistory = [item, ...history]
      .filter((value, index, self) => self.findIndex(v => v.id === value.id) === index)
      .slice(0, MAX_HISTORY_SIZE);

    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  }

  async function clearHistory() {
    setHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  }

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity onPress={() => addToHistory(item)} style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, item.type === 'artist' && styles.artistImage]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>
          {item.type === 'artist' && i18n.t('Artist')}
          {item.type === 'song' && `${i18n.t('Song')} ${item.author}`}
          {item.type === 'playlist' && i18n.t('Playlist')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={i18n.t('WhatDoYouWantToListenTo')}
        placeholderTextColor="#b3b3b3"
        style={styles.searchInput}
      />

      <FlatList
        data={query.length === 0 ? history : results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={history.length > 0 && query.length === 0 ? (
          <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>{i18n.t('ClearRecentSearches')}</Text>
          </TouchableOpacity>
        ) : null}
      />
      <StatusBar style='light'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#000000",
    height: height,
    width: width,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 0,
    marginBottom: 10,
    width: width ,
    color: 'white',
    borderColor: 'transparent',
    backgroundColor: "#2a2a2a",
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  artistImage: {
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    color: 'gray',
    fontSize: 14,
  },
  clearButton: {
    marginVertical: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
