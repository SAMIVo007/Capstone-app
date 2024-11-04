import { View, Text, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LandCard from "../../components/LandCard";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { AndroidButton } from "../../components/AndroidButton";
import { FlashList } from "@shopify/flash-list";
import LandBuyersSheet from "../../components/LandBuyersSheet";
import { getUserLands } from "../../util/LandApi";
import { useAuth } from "../../util/AuthContext";
import { getInquiryLandsById } from "../../util/landInquiry";
import { fetchUserEmail } from "../../util/authApi";

export default function Lands() {
	const [showSheet, setShowSheet] = useState(false);
	const [myLands, setMyLands] = useState([]);
	const [inquiries, setInquiries] = useState(null);
	// ref
	const bottomSheetRef = useRef(null);
	const handleClosePress = () => bottomSheetRef.current?.close();
	const handleOpenPress = () => {
		setShowSheet(true);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const { userData } = useAuth();

	const filterClientsByLand = async (landId) => {
		const inquiryData = await getInquiryLandsById(landId);
		const clients = await Promise.all(
			inquiryData.map(async (inquiry) => {
				const clientData = await fetchUserEmail(inquiry.clientId);
				return {
					clientId: inquiry.clientId,
					inquiryId: inquiry.id,
					status: inquiry.status,
					email: clientData.data.email,
					name: clientData.data.name,
				};
			})
		);
		setInquiries(clients);
	};

	useEffect(() => {
		const getMyLands = async () => {
			const lands = await getUserLands(userData);
			setMyLands(lands);
			// console.log("My Lands : ", lands);
		};
		getMyLands();
	}, []);

	return (
		<View className="flex-1 bg-[#f5faffff]">
			<View className="flex-row gap-3 m-4">
				<View className="flex-row flex-1 items-center gap-2 border border-gray-400 bg-gray-100 px-4 py-2 rounded-full my-2">
					<AntDesign name="search1" size={17} color="gray" />
					<TextInput placeholder="Search" className="flex-1" />
				</View>
				<AndroidButton
					className="bg-blue-500 rounded-full my-2"
					rippleColor="#025ecf"
				>
					<View className="flex-row items-center gap-2 px-1">
						<FontAwesome name="sort" size={18} color="white" />
						<Text className="text-white">Sort</Text>
					</View>
				</AndroidButton>
			</View>

			<FlashList
				data={myLands}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<LandCard
						{...item}
						onpress={() => {
							filterClientsByLand(item.id);
							handleOpenPress();
						}}
					/>
				)}
				estimatedItemSize={10}
				keyExtractor={(item, index) => index}
				ListFooterComponent={<View className="h-20" />}
			/>

			{showSheet && (
				<LandBuyersSheet
					closeSheet={() => handleClosePress()}
					ref={bottomSheetRef}
					inquiries={inquiries}
					refresh={() => {
						setInquiries(null);
					}}
				/>
			)}
		</View>
	);
}
