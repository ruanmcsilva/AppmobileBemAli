import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 


interface CardProps {
    img: any;
    title: string;
    description: string;
    onPress: () => void;
}

export const Card = ({ img, title, description, onPress }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.touchableContainer}> 
      <View style={styles.card}>
        <Image source={img} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && (
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
              {description}
            </Text>
          )}
        </View>
  
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward-circle-outline" size={30} color="#4FC3F7" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    touchableContainer: {
        width: '95%', 
        marginVertical: 8,
    },
    card: {
        flexDirection: "row",
        borderRadius: 15, 
        overflow: "hidden",
        backgroundColor: 'rgba(26, 35, 126, 0.8)', 
        shadowColor: "#00BCD4", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        minHeight: 120, 
        width: '100%', 
    },
    image: {
        width: "35%",  
        height: "100%",
    },
    content: {
        flex: 1,
        padding: 15, 
        justifyContent: "center",
    },
    title: {
        color: "#CFD8DC",
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 4,
    },
    description: {
        color: "#B3E5FC",
        fontSize: 14,
        lineHeight: 20,
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10, 
    },
    
});
