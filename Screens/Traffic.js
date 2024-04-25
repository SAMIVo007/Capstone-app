import {
	Image,
	ScrollView,
	Text,
	TextInput,
	SafeAreaView,
	View,
	Button,
	TouchableOpacity,
	ImageBackground,
	Modal,
	Pressable,
	TouchableHighlight,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { Carousel, Card } from "react-native-ui-lib";
import Colors from "../Components/Colors";
import { logoutUser, fetchUserDetails, isSessionValid } from "../util/Api";
import FadedView from "../Components/FadeView";
import { BlurView } from "expo-blur";
import { getUserVehicles } from "../util/vehicleApi";
import { getSessionToken } from "../util/tokenStore";
import Web3 from "../Metamask/WalleConnect";

export default function Traffic({ navigation }) {
	const [vehicles, setVehicles] = useState([]);

	const getallvehicles = async () => {
		const token = await getSessionToken();
		const thisUser = await fetchUserDetails(token);
		console.log("thisUser.data.id: ", thisUser.data.id);
		// setMyUser(thisUser.data.id);
		const myvehicles = await getUserVehicles(thisUser.data.id);
		console.log("myvehicles: ", myvehicles);
		setVehicles(myvehicles);
	};

	useEffect(() => {
		const checkSessionValidity = async () => {
			const sessionToken = await getSessionToken();
			try {
				const checkLoginSession = isSessionValid(sessionToken);
				if (checkLoginSession) {
					console.log("get all vehicles : ", sessionToken);
					getallvehicles();
				} else {
					navigation.navigate("Login");
				}
			} catch (error) {
				console.log("Error:", error);
			}
		};

		// Check session validity initially
		checkSessionValidity();
	}, []);

	return (
		<Web3>
			<View className="flex-1 overflow-hidden bg-[#dbebffff] justify-between">
				<View className="mb-6">
					<Text className="mt-8 p-4 font-bold text-base">My Vehicles</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 200 }}
						className="px-3 space-x-3"
					>
						{vehicles.map((vehicle, index) => (
							<TouchableOpacity
								key={index}
								className="rounded-3xl overflow-hidden p-2 bg-[#003b93f5] justify-center"
							>
								<Image
									source={require("../assets/Images/creta.webp")}
									style={{ height: 150, width: 300, borderRadius: 16 }}
								/>

								<View className="mt-1 flex-row items-center justify-between">
									<Text className="text-start p-2 text-base text-white font-bold">
										{vehicle.model}
									</Text>
									<Text className="text-end p-2 text-base text-white font-bold">
										{vehicle.plateNumber}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/*/////////////////////////////////////////////////////////////////////////////////////////////// */}

				<View className=" rounded-t-[32px] bg-[#003b93] p-3 pt-4 ">
					<View className="overflow-hidden rounded-t-[32px] ">
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 400 }}
						>
							<View className="overflow-hidden justify-center rounded-t-[32px] rounded-b-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Vehicle Info
								</Text>

								<View className="flex-row justify-evenly space-x-4">
									<TouchableOpacity
										onPress={() => {
											navigation.navigate("MyVehicles");
										}}
									>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Traffic</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Land</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Funds</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<View className="bg-primaryBlue rounded-lg p-4 ">
											<Ionicons
												name="language"
												size={24}
												color="white"
												style={{ padding: 2, paddingHorizontal: 8 }}
											/>
										</View>
										<Text className="text-center p-1">Contracts</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View className="overflow-hidden justify-center mt-3 rounded-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Chalaan History
								</Text>

								<View className="justify-evenly px-2">
									<Text className="p-2 border-b border-gray-600">
										1. ₹20000 • gaypanti
									</Text>
									<Text className="p-2 border-b border-gray-600">
										2. ₹2000 • Crossin red lights
									</Text>
									<Text className="p-2 ">3. ₹500 • No parking zone</Text>
								</View>
							</View>

							<View className="overflow-hidden justify-center mt-3 rounded-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Chalaan History
								</Text>
								<View className="justify-evenly px-2">
									<Text className="p-2 border-b border-gray-600">
										1. ₹10000 • Overspeeding
									</Text>
									<Text className="p-2 border-b border-gray-600">
										2. ₹2000 • Crossin red lights
									</Text>
									<Text className="p-2 ">3. ₹500 • No parking zone</Text>
								</View>
							</View>

							<View className="overflow-hidden justify-center mt-3 rounded-[16px] bg-[#9ac3ffff] p-2 ">
								<Text className=" text-base font-bold pt-1 px-3 pb-4">
									Chalaan History
								</Text>
								<View className="justify-evenly px-2">
									<Text className="p-2 border-b border-gray-600">
										1. ₹10000 • Overspeeding
									</Text>
									<Text className="p-2 border-b border-gray-600">
										2. ₹2000 • Crossin red lights
									</Text>
									<Text className="p-2 ">3. ₹500 • No parking zone</Text>
								</View>
							</View>

							{/* <View className=" py-48 "></View> */}
						</ScrollView>
					</View>
				</View>
			</View>

			<StatusBar style="dark" />
		</Web3>
	);
}
