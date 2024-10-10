import { createContext, useContext, useState, useEffect } from "react";
import { getSessionToken } from "./tokenStore";
import { isSessionValid } from "./authApi";
import * as SplashScreen from "expo-splash-screen";
import { ToastAndroid } from "react-native";
import { logoutUser } from "./authApi";

SplashScreen.preventAutoHideAsync();

// Create Auth Context
const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [authState, setAuthState] = useState(null);

	useEffect(() => {
		const checkUserAuth = async () => {
			try {
				const sessionToken = await getSessionToken();
				const sessionValid = await isSessionValid(sessionToken);
				if (!sessionValid) {
					setAuthState(false);
					ToastAndroid.show(
						"Session expired, Please login again",
						ToastAndroid.LONG
					);
				} else {
					setAuthState(true);
				}
				console.log("Auth State [ctx]:", authState);
			} catch (error) {
				console.log("Error:", error);
			}
		};

		checkUserAuth();
	}, []);

	useEffect(() => {
		if (authState) {
			SplashScreen.hideAsync();
		}
	}, [authState]);

	const logOut = () => {
		setAuthState(false);
		logoutUser();
	};

	const logIn = () => {
		setAuthState(true);
	};

	return (
		<AuthContext.Provider value={{ authState, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
}
