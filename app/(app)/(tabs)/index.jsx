import {
	Image,
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	useColorScheme,
	TextInput,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
	Octicons,
} from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Animated, { useSharedValue } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import FadedView from "../../../components/FadeView";
import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { router } from "expo-router";
import { useAuth } from "../../../util/AuthContext";

export default function HomePage() {
	const { userData } = useAuth();

	const width = Dimensions.get("window").width;
	const progressValue = useSharedValue(0);
	const { open } = useAppKit();
	const colorScheme = useColorScheme() ?? "light";

	useEffect(() => {
		console.log("userData on homepage: ", userData);
	}, [userData]);

	const items = [
		{
			uri: "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
		},

		{
			uri: "https://www.ids.ac.uk/wp-content/uploads/2024/05/Blognews-story-1024x600-px-1.jpg",
		},
		{
			uri: "https://www.anticorruptionindia.co.in/assets/images/AboutUs/1.jpg",
		},
		{
			uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNQlcFV-Pl4zRhg2x1Qpq9CqXPY4tJ7OQ_w&s",
		},
		{
			uri: "https://akm-img-a-in.tosshub.com/indiatoday/images/breaking_news/202202/modi-pti_1200x768.jpeg?VersionId=ipAZl_bHB8k412gUoI81QCKUIWdfKuEs",
		},
		{
			uri: "https://static.vecteezy.com/system/resources/previews/014/016/404/non_2x/international-anti-corruption-day-celebrated-on-december-9-vector.jpg",
		},
		{
			uri: "https://www.anticorruptionofindia.org.in/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-07-at-09.28.31-1.jpg",
		},
		{
			uri: "https://wallpapers.com/images/hd/narendra-modi-india-flag-8rwmh1jtmbmtvmh7.jpg",
		},
	];

	return (
		<>
			<StatusBar style="light" />
			<View
				style={{
					backgroundColor: { light: "#1e00c7", dark: "#1e00c7" }[colorScheme],
				}}
				className="p-4 pt-12 flex-row justify-between items-center "
			>
				<View className="flex-row justify-between items-center pl-1">
					{/* <Image
								source={require("../assets/Images/Emblem_of_India.png")}
								className="w-[12%] h-[100%]"
								tintColor={"#0062f5"}
							/> */}
					{/* <Ionicons
						name="person-circle-outline"
						size={26}
						color={"white"}
						style={{ marginRight: 6 }}
					/> */}

					<Text className="text-white text-lg text-center font-bold">
						Anti Corruptō
					</Text>
				</View>

				<View className="flex-row justify-between items-center">
					<Feather
						name="bell"
						size={24}
						color={"white"}
						style={{ padding: 2, paddingHorizontal: 8 }}
					/>

					<TouchableOpacity onPress={() => open()}>
						<Ionicons
							name="wallet-outline"
							size={25}
							color={"white"}
							style={{ padding: 2, paddingHorizontal: 8 }}
						/>
					</TouchableOpacity>

					{/* <AntDesign
						name="search1"
						size={24}
						color={"white"}
						style={{ padding: 2, paddingHorizontal: 8, paddingRight: 0 }}
					/> */}
				</View>
			</View>

			<ParallaxScrollView
				headerContentHeight={320}
				bgColor={"#1e00c7"}
				headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
				headerImage={
					<FadedView>
						<View className=" p-1 ml-4 ">
							<Text className="text-white text-xl font-bold  pb-1">
								Welcome, {userData?.name}
							</Text>
						</View>

						<View className=" mt-4 ">
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								className="px-3"
							>
								<View
									className="mr-3 bg-amber-500 rounded-2xl"
									style={{ width: 300, height: 150 }}
								></View>
								<View
									className="mr-3 bg-amber-500 rounded-2xl"
									style={{ width: 300, height: 150 }}
								></View>
								<View
									className="mr-3 bg-amber-500 rounded-2xl"
									style={{ width: 300, height: 150 }}
								></View>
								<View className="mx-2"></View>
							</ScrollView>

							<View
								className="flex-row items-center gap-2 bg-white px-6 p-4 rounded-full m-4"
								style={{ elevation: 10 }}
							>
								<AntDesign name="search1" size={17} color="gray" />
								<TextInput placeholder="Find Services..." className="flex-1" />
							</View>
						</View>
					</FadedView>
				}
			>
				{/* <StatusBar style="light" /> */}

				<View className="flex-1 bg-[#efedff]">
					<ScrollView
						showsVerticalScrollIndicator={false}
						fadingEdgeLength={300}
						className="flex-1"
					>
						<View
							style={{
								borderTopRightRadius: 32,
								borderTopLeftRadius: 32,
								padding: 10,
								paddingTop: 3,
								paddingBottom: 50,
								overflow: "hidden",
								// marginTop: 18,
								backgroundColor: "#ffffffe4",
							}}
						>
							<Octicons
								name="dash"
								size={38}
								color="#4a4a4a"
								className="self-center"
							/>

							<Text className=" text-base font-bold p-4 pt-1">Quick Links</Text>

							<View className="flex-row justify-evenly gap-4 px-4">
								<TouchableOpacity
									onPress={() => {
										router.navigate("/(app)/Traffic");
									}}
									className="flex-1"
								>
									<View className="bg-primaryBlue rounded-xl p-4 ">
										<Ionicons
											name="language"
											size={24}
											color="white"
											style={{ padding: 2, paddingHorizontal: 8 }}
										/>
									</View>
									<Text className="text-center text-sm p-1">Traffic</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										router.navigate("/(app)/Lands");
									}}
									className="flex-1"
								>
									<View className="bg-primaryBlue rounded-xl p-4 ">
										<Ionicons
											name="language"
											size={24}
											color="white"
											style={{ padding: 2, paddingHorizontal: 8 }}
										/>
									</View>
									<Text className="text-center text-sm p-1">Land</Text>
								</TouchableOpacity>
							</View>

							<View className="flex-row justify-evenly space-x-4 mt-4">
								<TouchableOpacity
									onPress={() => {
										router.navigate("/(app)/UserLandInterests");
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
									<Text className="text-center text-sm p-1">Voting</Text>
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
									<Text className="text-center text-sm p-1">Report</Text>
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
									<Text className="text-center text-sm p-1">Drive</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										router.navigate("/(app)/Marketplace");
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
									<Text className="text-center text-sm p-1">Marketplace</Text>
								</TouchableOpacity>
							</View>

							<Text className=" text-base font-bold p-4 mt-5">Updates</Text>

							<View className=" mt-[-8] justify-center items-center">
								<Carousel
									loop
									width={width}
									height={width * 0.58}
									pagingEnabled={true}
									snapEnabled={true}
									autoPlay={true}
									autoPlayInterval={3000}
									onProgressChange={(_, absoluteProgress) =>
										(progressValue.value = absoluteProgress)
									}
									mode="parallax"
									modeConfig={{
										parallaxScrollingScale: 0.9,
										parallaxScrollingOffset: 50,
									}}
									data={items}
									scrollAnimationDuration={1000}
									renderItem={({ item }) => (
										<View>
											<Image
												source={{ uri: item.uri }}
												style={{
													width: "100%",
													height: "100%",
													borderRadius: 15,
													padding: 4,
												}}
											/>
										</View>
									)}
								/>
							</View>

							<Text className=" text-base font-bold p-4 ">Explore</Text>

							<View className="mb-10">
								<ScrollView
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									className="px-3 space-x-3 overflow-visible"
								>
									<TouchableOpacity className="border mr-2 p-3 rounded-3xl flex-row justify-center items-center">
										<Ionicons
											name="language"
											size={18}
											color="black"
											style={{ padding: 2, paddingHorizontal: 6 }}
										/>
										<Text>My Activity</Text>
									</TouchableOpacity>
									<TouchableOpacity className="border mr-2 p-3 rounded-3xl flex-row justify-center items-center">
										<Ionicons
											name="language"
											size={18}
											color="black"
											style={{ padding: 2, paddingHorizontal: 6 }}
										/>
										<Text>My Activity</Text>
									</TouchableOpacity>
									<TouchableOpacity className="border mr-2 p-3 rounded-3xl flex-row justify-center items-center">
										<Ionicons
											name="language"
											size={18}
											color="black"
											style={{ padding: 2, paddingHorizontal: 6 }}
										/>
										<Text>My Activity</Text>
									</TouchableOpacity>
									<TouchableOpacity className="border p-3 mr-6 rounded-3xl flex-row justify-center items-center">
										<Ionicons
											name="language"
											size={18}
											color="black"
											style={{ padding: 2, paddingHorizontal: 6 }}
										/>
										<Text>My Activity</Text>
									</TouchableOpacity>
								</ScrollView>
							</View>
						</View>
					</ScrollView>
				</View>
			</ParallaxScrollView>
		</>
	);
}
