import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, TextInput, Modal } from 'react-native';
import { Camera, MapPin, Phone, Mail, Pencil, X, Plus, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

type ProfileData = {
  name: string;
  role: string;
  state: string;
  phone: string;
  email: string;
  services: string[];
};

export default function Profile() {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1578878799601-d40c1b42d86c?w=800&h=300&fit=crop');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeType, setActiveType] = useState<'profile' | 'cover'>('profile');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newService, setNewService] = useState('');
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Maria Silva',
    role: 'Costureira • Modelista',
    state: 'São Paulo, SP',
    phone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    services: ['Costura sob medida', 'Ajustes', 'Modelagem', 'Reforma de roupas']
  });

  const [editingData, setEditingData] = useState<ProfileData>(profileData);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== 'granted') {
          alert('Precisamos de permissão para acessar suas fotos!');
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          alert('Precisamos de permissão para acessar sua câmera!');
        }
      }
    })();
  }, []);

  const pickImage = async (type: 'profile' | 'cover', source: 'camera' | 'library') => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'profile' ? [1, 1] : [16, 9],
      quality: 1,
    };

    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setCoverImage(result.assets[0].uri);
      }
    }
  };

  const handleSaveProfile = () => {
    setProfileData(editingData);
    setEditModalVisible(false);
    setNewService('');
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setEditingData({
        ...editingData,
        services: [...editingData.services, newService.trim()]
      });
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setEditingData({
      ...editingData,
      services: editingData.services.filter((_, i) => i !== index)
    });
  };

  const ImagePickerModal = ({ type, visible, onClose }: { type: 'profile' | 'cover', visible: boolean, onClose: () => void }) => (
    visible ? (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolher foto</Text>
          <TouchableOpacity 
            style={styles.modalOption} 
            onPress={() => {
              pickImage(type, 'camera');
              onClose();
            }}
          >
            <Camera size={24} color="#666" />
            <Text style={styles.modalOptionText}>Tirar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => {
              pickImage(type, 'library');
              onClose();
            }}
          >
            <Mail size={24} color="#666" />
            <Text style={styles.modalOptionText}>Escolher da galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null
  );

  const EditProfileModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.editModalOverlay}>
        <View style={styles.editModalContent}>
          <View style={styles.editModalHeader}>
            <Text style={styles.editModalTitle}>Editar Perfil</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.editForm}>
            <View style={styles.editField}>
              <Text style={styles.editLabel}>Nome</Text>
              <TextInput
                style={styles.editInput}
                value={editingData.name}
                onChangeText={(text) => setEditingData({ ...editingData, name: text })}
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editLabel}>Profissão</Text>
              <TextInput
                style={styles.editInput}
                value={editingData.role}
                onChangeText={(text) => setEditingData({ ...editingData, role: text })}
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editLabel}>Estado</Text>
              <TextInput
                style={styles.editInput}
                value={editingData.state}
                onChangeText={(text) => setEditingData({ ...editingData, state: text })}
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editLabel}>Telefone</Text>
              <TextInput
                style={styles.editInput}
                value={editingData.phone}
                onChangeText={(text) => setEditingData({ ...editingData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editLabel}>Email</Text>
              <TextInput
                style={styles.editInput}
                value={editingData.email}
                onChangeText={(text) => setEditingData({ ...editingData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editLabel}>Serviços</Text>
              <View style={styles.servicesList}>
                {editingData.services.map((service, index) => (
                  <View key={index} style={styles.editServiceItem}>
                    <Text style={styles.serviceText}>{service}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveService(index)}
                      style={styles.removeServiceButton}
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.addServiceContainer}>
                <TextInput
                  style={[styles.editInput, styles.addServiceInput]}
                  value={newService}
                  onChangeText={setNewService}
                  placeholder="Adicionar novo serviço"
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  style={[styles.addServiceButton, !newService.trim() && styles.addServiceButtonDisabled]}
                  onPress={handleAddService}
                  disabled={!newService.trim()}
                >
                  <Plus size={20} color={newService.trim() ? '#fff' : '#999'} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.coverContainer}>
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <TouchableOpacity
          style={styles.editCoverButton}
          onPress={() => {
            setActiveType('cover');
            setModalVisible(true);
          }}
        >
          <Camera size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              setActiveType('profile');
              setModalVisible(true);
            }}
          >
            <Camera size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{profileData.name}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => {
                setEditingData(profileData);
                setEditModalVisible(true);
              }}
            >
              <Pencil size={16} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.role}>{profileData.role}</Text>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#666" />
              <Text style={styles.infoText}>{profileData.state}</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color="#666" />
              <Text style={styles.infoText}>{profileData.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail size={16} color="#666" />
              <Text style={styles.infoText}>{profileData.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          <View style={styles.servicesList}>
            {profileData.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <ImagePickerModal
        type={activeType}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <EditProfileModal />
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
    justifyContent: 'center',
    alignItems: 'center'
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
    alignSelf: 'flex-start',
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
    borderWidth: 2,
    borderColor: '#fff',
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  modalOptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1a1a1a',
  },
  modalCancel: {
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingTop: 16,
    marginTop: 8,
  },
  modalCancelText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  editModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  editModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  editModalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
  },
  editForm: {
    gap: 16,
  },
  editField: {
    marginBottom: 16,
  },
  editLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  editInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 12,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  editServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  removeServiceButton: {
    marginLeft: 8,
  },
  addServiceContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  addServiceInput: {
    flex: 1,
  },
  addServiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addServiceButtonDisabled: {
    backgroundColor: '#e5e5e5',
  },
});