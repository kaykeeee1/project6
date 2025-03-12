import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { User, MapPin, Phone, Scissors } from 'lucide-react-native';

export default function Register() {
  const [userType, setUserType] = useState<'client' | 'provider'>('client');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>AtelieConnect</Text>
        <Text style={styles.subtitle}>Crie sua conta</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>@</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MapPin size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.phoneContainer}>
          <View style={[styles.inputContainer, { flex: 2 }]}>
            <Phone size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="DDD"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 5, marginLeft: 8 }]}>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={9}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Você é:</Text>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'client' && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType('client')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'client' && styles.userTypeTextActive,
            ]}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'provider' && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType('provider')}
          >
            <Scissors size={16} color={userType === 'provider' ? '#fff' : '#666'} />
            <Text style={[
              styles.userTypeText,
              userType === 'provider' && styles.userTypeTextActive,
            ]}>Prestador de Serviço</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    fontSize: 20,
    color: '#666',
    width: 20,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1a1a1a',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginTop: 8,
  },
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  userTypeButtonActive: {
    backgroundColor: '#6366f1',
  },
  userTypeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#666',
  },
  userTypeTextActive: {
    color: '#fff',
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6366f1',
  },
});