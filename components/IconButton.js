import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function IconButton({ icon, onPress }) {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <Feather name={icon} size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
});
