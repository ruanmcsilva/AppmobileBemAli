import React, { useState, useMemo } from 'react';
import { 
    StyleSheet, 
    View, 
    FlatList, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Platform,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Input, Icon } from '@rneui/themed';
import { Card } from '../components/Productcard';
import { produtos, categorias } from '../data/produtos'; 

type Product = typeof produtos[0];

type RootStackParamList = {
    Perfil: undefined;
    Detalhes: { produto: Product };
    Sacola: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

interface ListHeaderProps {
    goToProfile: () => void;
    goToSacola: () => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    searchText: string;
    setSearchText: (text: string) => void;
}

const ListHeader = ({ 
    goToProfile,
    goToSacola,
    activeCategory, 
    setActiveCategory,
    searchText,
    setSearchText 
}: ListHeaderProps) => { 
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    onPress={goToProfile} 
                    style={styles.headerIcon}
                    accessibilityLabel="Acessar perfil do usuário"
                >
                    <Icon name="person-circle-outline" type="ionicon" color="#1A2E05" size={32} />
                </TouchableOpacity>
                <Text style={styles.logo}>Bem Ali</Text>
                <TouchableOpacity 
                    style={styles.headerIcon} 
                    onPress={goToSacola}
                    accessibilityLabel="Acessar carrinho de compras"
                >
                    <Icon name="basket-outline" type="ionicon" color="#1A2E05" size={32} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Input
                    placeholder="Buscar produtos..."
                    value={searchText}
                    onChangeText={setSearchText}
                    inputContainerStyle={styles.searchInput}
                    inputStyle={styles.searchInputText}
                    leftIcon={<Icon name="search" type="ionicon" color="#9CA3AF" size={20} />}
                    accessibilityLabel="Campo de busca de produtos"
                />
            </View>

            <Text style={styles.categoryTitle}>Categorias</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
            >
                <TouchableOpacity
                    style={[styles.categoryButton, activeCategory === 'Todos' && styles.categoryButtonActive]}
                    onPress={() => setActiveCategory('Todos')}
                    accessibilityRole="button"
                    accessibilityState={{ selected: activeCategory === 'Todos' }}
                >
                    <Text style={[styles.categoryText, activeCategory === 'Todos' && styles.categoryTextActive]}>
                        Todos
                    </Text>
                </TouchableOpacity>
                
                {categorias && categorias.map((categoria) => (
                    <TouchableOpacity
                        key={categoria}
                        style={[styles.categoryButton, activeCategory === categoria && styles.categoryButtonActive]}
                        onPress={() => setActiveCategory(categoria)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: activeCategory === categoria }}
                    >
                        <Text style={[styles.categoryText, activeCategory === categoria && styles.categoryTextActive]}>
                            {categoria}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchText, setSearchText] = useState('');

    const goToProfile = () => {
        navigation.navigate('Perfil');
    };
    
    const goToSacola = () => {
        navigation.navigate('Sacola');
    };

    const filteredProducts = useMemo(() => {
        if (!produtos) return []; 
        let items = produtos;
        if (activeCategory !== 'Todos') {
            items = items.filter(p => p.categoria === activeCategory);
        }
        if (searchText.trim() !== '') {
            items = items.filter(p => 
                p.nome.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        return items;
    }, [activeCategory, searchText]);

    const renderProduct = ({ item }: { item: Product }) => (
        <Card
            img={item.img}
            title={item.nome}
            price={item.preco}
            onPress={() =>
                navigation.navigate('Detalhes', {
                    produto: item
                })
            }
        />
    );

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar barStyle="dark-content" backgroundColor={styles.background.backgroundColor} />
            <FlatList
                data={filteredProducts} 
                renderItem={renderProduct} 
                keyExtractor={item => item.id.toString()} 
                numColumns={2}
                contentContainerStyle={styles.scrollContent}
                style={styles.flatListStyle} 
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <ListHeader 
                        goToProfile={goToProfile} 
                        goToSacola={goToSacola}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
                        <Text style={styles.emptySubText}>Tente ajustar sua busca ou filtro.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F0FDF4',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    flatListStyle: {
        flex: 1,
        width: '100%', 
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 50,
        width: '100%', 
    },
    headerContainer: {
        width: '100%',
        paddingHorizontal: 5,
        marginBottom: 16,
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4D7C0F',
    },
    headerIcon: {
        padding: 5,
    },
    searchContainer: {
        marginTop: 5,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
    },
    searchInputText: {
        color: '#1E293B',
        fontSize: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A2E05',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    categoryScroll: {
        paddingHorizontal: 5,
        paddingBottom: 10,
    },
    categoryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryButtonActive: {
        backgroundColor: '#65A30D',
        borderColor: '#65A30D',
    },
    categoryText: {
        color: '#3F3F46',
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#52525B',
    },
    emptySubText: {
        fontSize: 14,
        color: '#71717A',
        marginTop: 4,
    }
});

