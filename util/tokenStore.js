import * as SecureStore from "expo-secure-store";

export async function saveSessionToken(sessionToken) {
	try {
		await SecureStore.setItemAsync("sessionToken", sessionToken);
		console.log("Session token saved successfully:", sessionToken);
	} catch (error) {
		console.error("Error saving session token:", error);
	}
}

export async function getSessionToken() {
	try {
		const sessionToken = await SecureStore.getItemAsync("sessionToken");
		if (sessionToken) {
			console.log("Session token retrieved successfully:", sessionToken);
			return sessionToken;
		} else {
			console.log("No session token found.");
			return null;
		}
	} catch (error) {
		console.error("Error retrieving session token:", error);
		return null;
	}
}
