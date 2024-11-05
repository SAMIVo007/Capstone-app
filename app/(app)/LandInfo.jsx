import {
	View,
	Text,
	TextInput,
	useColorScheme,
	ImageBackground,
	useWindowDimensions,
	Image,
	Pressable,
	ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LandCard from "../../components/LandCard";
import { ThemedText } from "../../components/ThemedText";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import {
	AntDesign,
	Feather,
	FontAwesome,
	FontAwesome5,
	FontAwesome6,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";
import { AndroidButton } from "../../components/AndroidButton";
import { FlashList } from "@shopify/flash-list";
import LandBuyersSheet from "../../components/LandBuyersSheet";
import { useAuth } from "../../util/AuthContext";
import { getAllLands } from "../../util/LandApi";
import MarketCard from "../../components/MarketCard";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "../../components/ThemedView";
import { StatusBar } from "expo-status-bar";
import {
	router,
	useGlobalSearchParams,
	useLocalSearchParams,
} from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { fetchUserEmail } from "../../util/authApi";
import { createInquiry, getUserInterestedLands } from "../../util/landInquiry";
import LottieView from "lottie-react-native";
import LandTransferContract from "../../Metamask/LandTransferContract";

export default function LandInfo() {
	const { width } = useWindowDimensions();
	const progressValue = useSharedValue(0);
	const color = useColorScheme();
	const colorMode = color == "dark" ? "dark" : "light";
	const [ownerName, setOwnerName] = useState("");
	const [email, setEmail] = useState("");
	const [landInterested, setLandStatus] = useState(null);
	const [myLand, setMyLand] = useState(false);

	const localSearchParams = useLocalSearchParams();

	const {
		name,
		landType,
		area,
		location,
		currentPrice,
		boughtPrice,
		dimensionOfLand,
		ownerId,
		id,
		landIdentificationNumber,
		imgUri,
		status,
		web3Id,
	} = localSearchParams;

	const priceDecorator = (price) => {
		const n = price.length;
		for (let i = n - 1; i >= 0; i--) {
			if (i % 2 == 0 && i != 0 && i != n - 1) {
				price = price.slice(0, i) + "," + price.slice(i);
			}
		}
		return price;
	};

	const items = [
		{
			uri: "https://png.pngtree.com/thumb_back/fw800/background/20240614/pngtree-luxury-real-estate-house-property-image_15868457.jpg",
		},
		{
			uri: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
		},
		{
			uri: "https://www.premierhomesca.com/wp-content/uploads/2020/03/EL3-Model-11-scaled-e1611704624780.jpg",
		},
	];

	const { userData } = useAuth();

	const confirmInterest = async () => {
		const data = {
			clientId: userData.id,
			landId: id,
		};
		try {
			const response = await createInquiry(data);
			console.log("Inquiry response:", response);
		} catch (error) {
			console.log("Error:", error);
		}
	};

	const formData = {
		landId: web3Id,
		landIdWeb3: web3Id,
		landIdBackend: id,
		prevOwnerId: ownerId,
		currentOwnerId: userData.id,
		transferAmount: boughtPrice,
	};

	useEffect(() => {
		const myLandCheck = () => {
			if (userData.id === ownerId) {
				setMyLand(true);
			}
		};

		const getownerName = async () => {
			const owner = await fetchUserEmail(ownerId);
			setOwnerName(owner.data.name);
			setEmail(owner.data.email);
		};

		const fetchInterestedLands = async () => {
			const lands = await getUserInterestedLands(userData.id);
			const hasMatchingLandId = lands.some((entry) => entry.land.id === id);
			setLandStatus(hasMatchingLandId);
		};

		myLandCheck();
		getownerName();
		fetchInterestedLands();
	}, []);

	return (
		<>
			<StatusBar style="dark" />
			<ParallaxScrollView
				headerContentHeight={400}
				headerBackgroundColor={{ light: "#ffffff", dark: "#353636" }}
				headerImage={
					<ImageBackground
						style={{ flex: 1 }}
						source={{
							uri: "https://png.pngtree.com/thumb_back/fw800/background/20240614/pngtree-luxury-real-estate-house-property-image_15868457.jpg",
						}}
					>
						<View className="flex-row mt-10 justify-between">
							<AndroidButton
								onPress={() => router.back()}
								className="rounded-full m-4 bg-[#f3f4f695] border-gray-300"
								rippleColor="#b0b0b0ff"
							>
								<Ionicons name="arrow-back-outline" size={24} color="black" />
							</AndroidButton>

							<AndroidButton
								onPress={() => {}}
								className="rounded-full m-4 bg-[#f3f4f695] border-gray-300 justify-center items-center"
								rippleColor="#b0b0b0ff"
							>
								<FontAwesome name="heart" size={24} color="#ff4b4b" />
							</AndroidButton>
						</View>
					</ImageBackground>
				}
			>
				<View className="p-7">
					<ThemedText type="title" style={{ fontSize: 26 }}>
						{name}
					</ThemedText>

					<View className="flex-row items-center pt-1 justify-start">
						<Feather name="map-pin" size={12} color="#606060" />
						<ThemedText style={{ paddingLeft: 6, color: "#606060" }} type="small">
							{location}
						</ThemedText>
					</View>

					<View
						className="flex-wrap rounded-2xl gap-2 p-4 mt-6 justify-between bg-gray-100"
						style={{ flexDirection: "row" }}
					>
						<View
							className=" flex-row p-2 pr-4 items-center gap-2 border-gray-300 "
							// style={{ flex: 1 }}
						>
							<Foundation name="mountains" size={20} color="#606060" />
							<ThemedText type="small" style={{ color: "#606060" }}>
								{landType}
							</ThemedText>
						</View>
						<View className="border-l  border-gray-300"></View>
						<View
							className=" flex-row p-2 items-center gap-2"
							// style={{ flex: 1 }}
						>
							<MaterialCommunityIcons name="axis-arrow" size={18} color="#606060" />
							<ThemedText type="small" style={{ color: "#606060" }}>
								{dimensionOfLand} ({area} sqft.)
							</ThemedText>
						</View>
					</View>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Images
					</ThemedText>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Owner
					</ThemedText>

					<ThemedView className="flex-row mt-4 items-center justify-between">
						<View className="flex-row">
							<Image
								source={{
									uri: "https://st4.depositphotos.com/9998432/22812/v/450/depositphotos_228123692-stock-illustration-person-gray-photo-placeholder-man.jpg",
								}}
								style={{ width: 70, height: 70, borderRadius: 35 }}
							/>

							<ThemedView className="pl-4 justify-center">
								<ThemedText type="defaultSemiBold">{ownerName}</ThemedText>
								<ThemedText
									type="link"
									onPress={() => {
										console.log("pressed!");
									}}
								>
									{email}
								</ThemedText>
							</ThemedView>
						</View>

						{/* <View className="flex-row gap-3 items-center justify-end">
							<AndroidButton
								rippleColor="#006a10ff"
								className="rounded-full bg-green-600"
							>
								<Feather name="phone" size={22} color="white" />
							</AndroidButton>
							<AndroidButton
								rippleColor="#7f0000ff"
								className="rounded-full bg-red-500 justify-center items-center"
							>
								<Feather name="mail" size={22} color="white" />
							</AndroidButton>
						</View> */}
					</ThemedView>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Official Land-Id
					</ThemedText>

					<ThemedText type="small" style={{ color: "#606060" }} className="pt-2">
						{landIdentificationNumber}
					</ThemedText>
				</View>
			</ParallaxScrollView>

			<ThemedView
				className="flex-row p-7 py-5 justify-between items-center"
				style={{ elevation: 20 }}
			>
				<View className="gap-1">
					<ThemedText type="small" style={{ color: "#606060", fontSize: 12 }}>
						Current Price
					</ThemedText>
					<ThemedText type="subtitle">₹{priceDecorator(boughtPrice)}</ThemedText>
				</View>

				{myLand ? null : landInterested === null ? (
					<View
						style={{
							height: 45,
							overflow: "hidden",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 50,
							backgroundColor: "#6b7280",
						}}
					>
						<LottieView
							source={require("../../assets/lotties/loading.json")}
							autoPlay
							loop={true}
							style={{
								width: 100,
								height: 100,
								transform: [{ translateY: -1 }],
							}}
						/>
					</View>
				) : landInterested ? (
					status === "APPROVED" ? (
						<LandTransferContract formData={formData} />
					) : (
						<AndroidButton
							innerStyle={{
								paddingHorizontal: 26,
								flexDirection: "row",
								gap: 6,
								alignItems: "center",
								justifyContent: "center",
							}}
							className="rounded-full bg-gray-500"
							rippleColor="#b0b0b0ff"
						>
							<FontAwesome6 name="clock" size={16} color="white" />
							<Text className="color-white">Pending</Text>
						</AndroidButton>
					)
				) : (
					<AndroidButton
						onPress={() => {
							confirmInterest();
						}}
						innerStyle={{
							paddingHorizontal: 26,
							flexDirection: "row",
							gap: 6,
							alignItems: "center",
							justifyContent: "center",
						}}
						className="rounded-full bg-primaryBlue"
					>
						<FontAwesome6 name="hand-sparkles" size={16} color="white" />
						<Text className="color-white">Interested</Text>
					</AndroidButton>
				)}
			</ThemedView>
		</>
	);
}
