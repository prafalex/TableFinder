import { Pressable, View, Text } from "react-native/types"
function Restaurant(name, img) {
    return <View>
        <Pressable>
            <View>
                <Text>{name}</Text>
            </View>
        </Pressable>
    </View>
}

export default Restaurant;