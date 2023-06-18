import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from "../../variables/colours";
function IconButton({icon, color, text, onPress}) {
    return(
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Ionicons name={icon} size={24} color={color}></Ionicons>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    ); 
}

export default IconButton;

const styles =StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    text: {
        alignSelf: 'center',
        margin: 2
    }
});