import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import { getGridPoint, getForecastData } from "../requests/weather.requests";


export default function ForecastList() {

    const navigation = useNavigation()  //simialr to use history
    const [forecast, setForecast] = useState([
        {
            temperature: 80,
            name: 'Mostly Sunny',
            number: 1,
        },
        {
            temperature: 91,
            name: 'Sunny',
            number: 2,
        }
    ]);
    const [location, setLocation] = useState();

    useEffect(() => {
        getLocation();
    }, [])

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if ( status !== 'granted') {
            conaole.log('permission not granted');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation)
    }

    useEffect(() => {
        if(location && location.coords) {
            getWeatherData();
        }
        //when location is updated, run this function
    }, [location]);

    const getWeatherData = async () => {
        let forecastUrl = await getGridPoint(location);
        let forecastData = await getForecastData(forecastUrl);
        setForecast(forecastData);
        }

    return(
        <View style={{height: '100%'}}>
            <Text>{JSON.stringify(location)}</Text>
            {/* <Text>List goes here . . .</Text> */}
            {/* Similar to .map to display data */}
            <FlatList 
            data={forecast}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={{padding: 20, borderColor: 'gray', borderBottomWidth: 1}}
                    onPress={() => {
                    console.log('You pressed the button.');
                    // takes in the name (Details) of the page and the props (item)
                        navigation.navigate('Details', item);
                }}
                    >
                <Text>{item.name} : {item.temperature}</Text>
                </TouchableOpacity>
            )}
            style={{width: '100%'}}
            />
        </View>
    )
}