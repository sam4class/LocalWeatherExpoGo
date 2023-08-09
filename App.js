import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForecastList from './componets/ForecastList';
import ForecastDetails from './componets/ForecastDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar 
    //   backgroundColor='teal'
    //   animated
    //   barStyle={'default'}
    //   // hidden={false}
    //   />
    //   <ForecastList/>
      <NavigationContainer>
        {/* Similar to router */}
        <Stack.Navigator initialRouteName='Weekly Forecast'>
          {/* Similar to routes */}
          <Stack.Screen name='Weekly Forecast' component={ForecastList} />
          <Stack.Screen  name='Details' component={ForecastDetails}/>
        </Stack.Navigator>
 
      </NavigationContainer>
    // </SafeAreaView>
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
