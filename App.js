import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	FontAwesome5,
	Octicons,
} from "@expo/vector-icons";
import LoginScreen from "./Screens/LoginScreen";
import LoginSplash from "./Screens/LoginSplash";
import SignUpPage from "./Screens/SignUp";
import HomePage from "./Screens/Home";
import MenuScreen from "./Screens/MenuScreen";
import Services from "./Screens/Services";
import Report from "./Screens/Report";
import Traffic from "./Screens/Traffic";
import MyVehicles from "./Screens/MyVehicles";
import Colors from "./Components/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "node-libs-expo/globals";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LoginSplash" component={LoginSplash} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="SignUp" component={SignUpPage} />
				<Stack.Screen name="Home" component={HomePage} />
				<Stack.Screen name="Services" component={Services} />
				<Stack.Screen name="MenuScreen" component={MenuScreen} />
				<Stack.Screen name="MyVehicles" component={MyVehicles} />
				<Stack.Screen name="Traffic" component={Traffic} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
