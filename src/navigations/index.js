import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import WellcomeScreen from "../screens/WellcomeScreen";

const Stack = createNativeStackNavigator();

function AppNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Wellcome" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Wellcome" component={WellcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default AppNavigation;