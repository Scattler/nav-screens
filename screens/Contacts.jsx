import { StyleSheet, Text, View,Button } from 'react-native';

export default function Contacts({navigation,route}){
    const {name,email} = route.params;
    return (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}> 
            <Text style={{marginBottom:10}}> Estamos en contactenos</Text>
            <Text>Nombre completo es: {name} con correo: {email}</Text>
        </View>
    );
}
