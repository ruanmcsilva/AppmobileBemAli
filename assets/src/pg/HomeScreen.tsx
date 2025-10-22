import React from 'react';
import { StyleSheet, View, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/card';
import fundo from '../img/fundo.jpeg';
import { planetas } from '../data/planetas';


interface Planeta {
    nome: string;
    img: any;
    descricao: string;
}


const ListHeader = ({ goToProfile }: { goToProfile: () => void }) => (
    <View style={styles.topContainer}> 
        
        
        <TouchableOpacity onPress={goToProfile} style={styles.profileButton}>
            <Ionicons 
                name="person-circle-outline" 
                size={35} 
                color="#E0F7FA" 
            />
        </TouchableOpacity>
        
        
        <View style={styles.titleContainer}>
            <Text style={styles.title}>🌌 Sistema Solar</Text>
        </View>

        
        <View style={{ width: 35 }} /> 
    </View>
);


export default function HomeScreen() {
    const navigation = useNavigation();

    const goToProfile = () => {
        
        navigation.navigate('Perfil' as never); 
    };

    
    const renderPlaneta = ({ item }: { item: Planeta }) => (
        <Card
            img={item.img}
            title={item.nome}
            description={item.descricao}
            onPress={() =>
                navigation.navigate('Detalhes', {
                    planeta: item.nome,
                    description: item.descricao,
                    img: item.img,
                } as any)
            }
        />
    );

    return (
        <ImageBackground source={fundo} style={styles.background}>
            <View style={styles.overlay}>
                
                
                <FlatList
                    data={planetas} 
                    renderItem={renderPlaneta} 
                    keyExtractor={item => item.nome} 
                    contentContainerStyle={styles.scrollContent}
                    style={styles.flatListStyle} 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <ListHeader goToProfile={goToProfile} />}
                />

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    flatListStyle: {
        flex: 1,
        width: '100%', 
    },
    scrollContent: {
        paddingBottom: 50,
        alignItems: 'center',
        width: '100%', 
    },
    
    
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 30,
        paddingTop: 50,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profileButton: {
        
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#E0F7FA',
        textShadowColor: 'rgba(0, 188, 212, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        letterSpacing: 1,
    },
});
