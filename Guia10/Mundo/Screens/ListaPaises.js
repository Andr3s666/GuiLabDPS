import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ListaPaises = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries(searchText);
  }, [searchText, countries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://65f9be823909a9a65b1942ac.mockapi.io/paises');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const filterCountries = (text) => {
    const query = text.toLowerCase();
  
    const filtered = countries.filter((item) => {
      const nombre = item?.nombre?.espanol?.toLowerCase?.() || '';
      const codigo = item?.codigo_pais?.toLowerCase?.() || '';
      return nombre.includes(query) || codigo.includes(query);
    });
  
    setFilteredCountries(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.countryCard} onPress={() => navigation.navigate('DetallePais', { country: item })}>
      <View style={styles.countryInfo}>
        <Image source={{ uri: item.bandera }} style={styles.flagImage} />
        <Text style={styles.countryName}>{item.nombre.espanol}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o código"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  countryList: { padding: 10 },
  countryCard: {
    width: windowWidth / 2 - 15,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  countryInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flagImage: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'cover',
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ListaPaises;
