import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera, MapPin, Phone, Mail, Pencil } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1578878799601-d40c1b42d86c?w=800&h=300&fit=crop');

  const pickImage = async (type: 'profile' | 'cover') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'profile' ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setCoverImage(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverContainer}>
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <TouchableOpacity
          style={styles.editCoverButton}
          onPress={() => pickImage('cover')}
        >
          <Camera size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => pickImage('profile')}
          >
            <Camera size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Maria Silva</Text>
            <TouchableOpacity style={styles.editButton}>
              <Pencil size={16} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.role}>Costureira • Modelista</Text>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#666" />
              <Text style={styles.infoText}>São Paulo, SP</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color="#666" />
              <Text style={styles.infoText}>(11) 98765-4321</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail size={16} color="#666" />
              <Text style={styles.infoText}>maria.silva@email.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceText}>Costura sob medida</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceText}>Ajustes</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceText}>Modelagem</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceText}>Reforma de roupas</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    padding: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginTop: -64,
    marginBottom: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editProfileButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    gap: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#1a1a1a',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  role: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  infoList: {
    marginTop: 16,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  servicesContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  serviceText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});