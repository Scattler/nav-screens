import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
//import Loguin from './screens/Loguin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Banner from './Componets/Banner.js';


//crear constante para generar las rutas de las pantallas(screens)

let users = [
  { useremail: 'andersonyepesbedoya@gmail.com', name: 'anderson', password: "22", role: 1 },
  { useremail: 'aladeus@gmail.com', name: 'alejandro', password: "11", role: 2 }
]


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const { } = useForm();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: "red"
        },
        headerTintColor: "white"
      }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'DAVIVIENDA' }} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{title:'Inicio'}}/>
        <Stack.Screen name="Contacts" component={Contacts} options=      {{title:'Contactanos'}}/>
        <Stack.Screen name='Loguin'component={Loguin} options={{title:'Loguin'}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [errormess, seterrormess] = useState('');
  const [vacio, setvacio] = useState('');


  return (
    <View style={styles.container}>
      <Image
        style={styles.imgstyle}
        source={require('./assets/Arriba.svg')}
      />
      <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 20 }}>INGRESA LOS DATOS DEL USUARIO</Text>
      <TextInput
        label="Correo electronico"
        mode='Flat'
        right={<TextInput.Icon icon="account-box" />}
        style={{ marginTop: 20, backgroundColor: "#dcdcdc" }}
        // onBlur={onBlur}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        label="Password"
        mode='flat'
        right={<TextInput.Icon icon="eye" />}
        style={{ marginTop: 25, backgroundColor: "#dcdcdc" }}
        // onBlur={onBlur}
        onChangeText={password => setpassword(password)}
        value={password}
        secureTextEntry  //PARA NO DEJAR VER LO QUE SE ESTA ESCRIBIENDO EN LA CONTRASEÑA, POR DEFECTO VIENE EN TRUE
      />

      <Button
        style={{ marginTop: 40, backgroundColor: 'red' }}
        icon="login"
        mode="contained"
        onPress={() => {
          if (email != '' && password != '') {
            let findUser = users.find(usr => usr.useremail == email && usr.password == password);
            if (findUser != undefined) {
              seterrormess('')
              const { name, email } = findUser
              setEmail('');
              setpassword('');
              navigation.navigate('Contacts', { name: name, email: email })
            }
            else {
              seterrormess('Correo y/o contraseña ICONRRECTO')
            }
          } else {
            seterrormess('Todos los datos son obligatorios')
          }
        }}
      >
        Iniciar Sesion
      </Button>
      <Text style={{ color: 'green' }}>{vacio}</Text>
      <Text style={{ color: 'red' }}>{errormess}</Text>

      <Text style={{ marginTop: 25, color: "#b5b5b5" }}>Terminos y Condiciones</Text>
    </View>
  );
}
function ProductsScreen({ navigation }) {
  let title = "Este es el titulo"
  let fullname = "Roxy la mejor de lo mejor"
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Estamos en Productos</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, //lo que hace es no mostrar cada tittulo del componente....
        tabBarActiveTintColor: 'Blue',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#b5b5b5',
        tabBarInactiveBackgroundColor: '#8b0000'
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarStyle: { display: 'none' },
        tabBarIcon: (tabInfo) => (<MaterialIcons name='home' size={22} />)
      }} />
      <Tab.Screen name='Products' component={ProductsScreen} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name='category' size={22} />)
      }} />
      <Tab.Screen name='Contacts' component={Contacts} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name='call' size={22} />)
      }} />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgstyle: {
    width: 120,
    height: 100,
    marginBottom: 35
  }
});
