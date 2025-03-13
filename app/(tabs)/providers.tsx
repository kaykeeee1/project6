import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const providers = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Costureira',
    rating: 4.8,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    specialties: ['Vestidos', 'Ajustes', 'Alta Costura']
  },
  {
    id: '2',
    name: 'Beatriz Santos',
    role: 'Modelista',
    rating: 4.9,
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    specialties: ['Modelagem', 'Desenho Técnico', 'Protótipos']
  },
  {
    id: '3',
    name: 'Carolina Lima',
    role: 'Costureira • Estilista',
    rating: 4.7,
    location: 'Belo Horizonte, MG',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    specialties: ['Roupas Sob Medida', 'Reformas', 'Bordados']
  }
];

export default function Providers() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prestadoras de Serviços</Text>
        <Text style={styles.subtitle}>Encontre profissionais qualificadas perto de você</Text>
      </View>

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.providerImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.providerName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFB800" fill="#FFB800" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.role}>{item.role}</Text>
              
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#666" />
                <Text style={styles.location}>{item.location}</Text>
              </View>

              <View style={styles.specialtiesContainer}>
                {item.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#1a1a1a',
  },
  role: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  specialtyTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
});