import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../components/AuthContext';

export default function PerfilScreen() {
    const { user, signOut } = useAuth(); 
    const [imageUri, setImageUri] = useState<string | null>(null);

    
    const requestPermissions = async () => {
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (!mediaPermission.granted || !cameraPermission.granted) {
            Alert.alert(
                'Permissão Necessária',
                'Precisamos de acesso à sua Galeria e Câmera para alterar a foto do perfil.'
            );
            return false;
        }
        return true;
    };

    const pickImage = async (mode: 'camera' | 'library') => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        let result: ImagePicker.ImagePickerResult;

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        };

        if (mode === 'library') {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            result = await ImagePicker.launchCameraAsync(options);
        }

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
            console.log('Nova URI da Imagem:', result.assets[0].uri);
        }
    };
    
    const handleImagePick = () => {
        Alert.alert(
            "Mudar Foto do Perfil",
            "Escolha de onde você deseja selecionar a imagem:",
            [
                { text: "Abrir Galeria", onPress: () => pickImage('library') },
                { text: "Abrir Câmera", onPress: () => pickImage('camera') },
                { text: "Cancelar", style: 'cancel' }
            ]
        );
    };

    const userName = user?.email.split('@')[0] || 'Usuário';
    const userEmail = user?.email || 'E-mail não disponível';
    const userMembroDesde = user?.membroDesde || 'Data não disponível';
    

    const placeholderImage = require('../img/fundo.jpeg');


    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
                <Image
                    source={imageUri ? { uri: imageUri } : placeholderImage} 
                    style={styles.profileImage}
                />
                <View style={styles.editIcon}>
                    <Ionicons name="camera" size={20} color="white" />
                </View>
            </TouchableOpacity>
            

            <View style={styles.dataContainer}>
                <Text style={styles.title}>{userName}</Text> 
                
                <View style={styles.infoRow}>
                    <Ionicons name="mail" size={18} color="#BBDEFB" style={{ marginRight: 8 }} />
                    <Text style={styles.text}>{userEmail}</Text> 
                </View>
                
                <View style={styles.infoRow}>
                    <Ionicons name="calendar" size={18} color="#BBDEFB" style={{ marginRight: 8 }} />
                    <Text style={styles.text}>Membro desde: {userMembroDesde}</Text> 
                </View>
            </View>
            

            <Button
                title="Sair (Logout)"
                buttonStyle={styles.logoutButton}
                titleStyle={{ color: '#FFF' }}
                onPress={() => {
                    signOut();

                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000033',
        paddingTop: 50,
    },
    imageContainer: {
        marginBottom: 30,
        position: 'relative',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#4FC3F7',
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#00BCD4',
        borderRadius: 15,
        padding: 5,
    },
    dataContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E0F7FA',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: 18,
        color: '#BBDEFB',
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
});
