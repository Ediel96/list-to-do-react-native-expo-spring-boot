import { Button, StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import Layout from './components/Layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="HomeScreen" 
        component={HomeScreen} 
        options={ ({navigation}) => ({
          title:'Task App',
          headerStyle:{backgroundColor:"#222f3e" }, 
          headerTitleStyle:{color:'#ffffff'},
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen')}>
              <Text style={{color:'#ffffff', marginRight:20, fontSize:18}} >New</Text>
            </TouchableOpacity>
          ),
        })}
        />
        <Stack.Screen name="TaskFormScreen" component={TaskFormScreen}
          options= {{
            title: 'Create a Task',
            headerStyle:{backgroundColor:"#222f3e" }, 
            headerTitleStyle:{color:'#ffffff'},
            headerTintColor:'#ffffff'
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
