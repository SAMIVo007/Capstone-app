import { Redirect, router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AndroidButton } from "@/components/AndroidButton";
import { useAuth } from "../../util/AuthContext";
import LottieSplashScreen from "@/components/LottieSplashScreen";
import Web3 from "@/Metamask/WalletConnect";

export default function AppLayout() {
	const { authState } = useAuth(); // Access auth state from context
	console.log("Auth state (app): ", authState);

	if (authState === null) {
		console.log("Checking authentication, showing loading state...");
		return <LottieSplashScreen />;
	}

	if (!authState) {
		console.log("Redirecting to login...");
		return <Redirect href={"/Login"} />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="Traffic"
				options={{
					orientation: "portrait",
					headerTitle: "My Vehicles",
					headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
					headerStyle: { backgroundColor: "#dbebffff" },
					headerLeft: () => (
						<AndroidButton
							onPress={() => router.back()}
							style={null}
							innerStyle={null}
							className="rounded-full ml-[-12] mr-1"
							rippleColor="#86aad4ff"
						>
							<Ionicons name="chevron-back" size={24} color="black" />
						</AndroidButton>
					),
				}}
			/>
			<Stack.Screen
				name="Lands"
				options={{
					orientation: "portrait",
					headerTitle: "My Lands",
					headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
					headerStyle: { backgroundColor: "#dbebffff" },
					headerLeft: () => (
						<AndroidButton
							onPress={() => router.back()}
							style={null}
							innerStyle={null}
							className="rounded-full ml-[-12] mr-1"
							rippleColor="#86aad4ff"
						>
							<Ionicons name="chevron-back" size={24} color="black" />
						</AndroidButton>
					),
				}}
			/>
			<Stack.Screen
				name="Marketplace"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="LandInfo"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}