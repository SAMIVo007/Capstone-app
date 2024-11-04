import {
	View,
	Text,
	TextInput,
	useColorScheme,
	ImageBackground,
	useWindowDimensions,
	Image,
	Pressable,
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

export default function LandInfo() {
	const { width } = useWindowDimensions();
	const progressValue = useSharedValue(0);
	const color = useColorScheme();
	const colorMode = color == "dark" ? "dark" : "light";

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
							{area}, {location}
						</ThemedText>
					</View>

					<View
						className="flex-wrap rounded-2xl gap-2 p-4 mt-6 bg-gray-100"
						style={{ flexDirection: "row" }}
					>
						<View
							className=" flex-row p-2 px-5 items-center gap-2 border-r border-gray-300 "
							style={{ flex: 1 }}
						>
							<Foundation name="mountains" size={20} color="#606060" />
							<ThemedText type="small" style={{ color: "#606060" }}>
								{landType}
							</ThemedText>
						</View>
						<View
							className=" flex-row p-2 px-5 items-center justify-center gap-2"
							style={{ flex: 1 }}
						>
							<MaterialCommunityIcons name="axis-arrow" size={18} color="#606060" />
							<ThemedText type="small" style={{ color: "#606060" }}>
								{dimensionOfLand} sqft.
							</ThemedText>
						</View>
					</View>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Official Id
					</ThemedText>

					<ThemedText type="small" style={{ color: "#606060" }} className="pt-2">
						{landIdentificationNumber}
					</ThemedText>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Owner
					</ThemedText>

					<ThemedView className="flex-row mt-4 items-center justify-between">
						<View className="flex-row">
							<Image
								source={{
									uri: "https://ichef.bbci.co.uk/news/480/cpsprodpb/ef0e/live/9723a330-718c-11ef-8331-3bcdbb18c020.jpg.webp",
								}}
								style={{ width: 70, height: 70, borderRadius: 35 }}
							/>

							<ThemedView className="pl-4 justify-center">
								<ThemedText type="defaultSemiBold">Owner Name</ThemedText>
								<ThemedText type="small" style={{ fontSize: 12, color: "#606060" }}>
									Designation
								</ThemedText>
							</ThemedView>
						</View>

						<View className="flex-row gap-3 items-center justify-end">
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
						</View>
					</ThemedView>

					<ThemedText type="defaultSemiBold" className="mt-8">
						Images
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

				<AndroidButton
					innerStyle={{ paddingHorizontal: 26 }}
					className="rounded-full bg-primaryBlue"
				>
					<Text className="color-white">Interested</Text>
				</AndroidButton>
			</ThemedView>
		</>
	);
}
