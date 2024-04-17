import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import PrimaryButton from "../Components/primaryButton";
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import addVehicleABI from "./ABI's/addVehicleABI.json";
import Web3 from "./WalleConnect";

export default function AddVehicle({ values }) {
	const {
		vehicleID,
		phoneNum,
		buyDate,
		model,
		plateNum,
		insuranceValidity,
		pollutionValidity,
	} = values;

	console.log(
		"VID:",
		vehicleID,
		" PhNo:",
		phoneNum,
		" Buy Date:",
		buyDate,
		" Model:",
		model,
		" Plate:",
		plateNum,
		" insurance:",
		insuranceValidity,
		" Pollution:",
		pollutionValidity
	);

	// Writing to the Contract
	const { config } = usePrepareContractWrite({
		address: "0x7a134d5e67e388d7dbdb62491c1c7e1b6374548a",
		abi: addVehicleABI,
		functionName: "addVehicle",
		args: [
			vehicleID,
			parseInt(phoneNum),
			buyDate,
			model,
			plateNum,
			insuranceValidity,
			pollutionValidity,
		],
	});

	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	return (
		<Web3>
			<PrimaryButton
				onPress={() => {
					try {
						write?.();

						if (isLoading) {
							console.log("Loading...");
						} else if (isSuccess) {
							console.log("Vehicle added successfully", JSON.stringify(data));
							Alert.alert("Vehicle added successfully.", [
								{ text: "OK", style: "cancel" },
							]);
						}
					} catch (error) {
						console.log(error);
					}
				}}
			>
				Add
			</PrimaryButton>
		</Web3>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
	},
	marginVertical: {
		flex: 1,
		marginVertical: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	centerText: {
		fontSize: 16,
		textAlign: "center",
		color: "#fff",
	},
	button: {
		backgroundColor: "#57B36A",
		padding: 10,
		width: 140,
		borderRadius: 32,
	},
});
