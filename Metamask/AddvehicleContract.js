import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
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
		year,
		make,
		model,
		plateNum,
		color,
		insuranceValidity,
		pollutionValidity,
	} = values;

	console.log(
		"VID:",
		vehicleID,
		", Year:",
		year,
		", Make:",
		make,
		", Model:",
		model,
		", Plate:",
		plateNum,
		", Color:",
		color,
		", insurance:",
		insuranceValidity,
		", Pollution:",
		pollutionValidity
	);

	// Writing to the Contract
	const { config } = usePrepareContractWrite({
		address: "0xe1eeeff54b4ebe113c383315ecd49b494cf32c46",
		abi: addVehicleABI,
		functionName: "addVehicle",
		args: [
			vehicleID,
			parseInt(year),
			make,
			model,
			plateNum,
			color,
			insuranceValidity,
			pollutionValidity,
		],
	});

	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	useEffect(() => {
		if (isLoading) {
			console.log("Loading...");
		}
		if (isSuccess) {
			console.log("Vehicle added successfully", JSON.stringify(data));
			Alert.alert("Vehicle added successfully.", [
				{ text: "OK", style: "cancel" },
			]);

		}
	}, [isLoading, isSuccess]);

	return (
		<Web3>
			<PrimaryButton
				onPress={() => {
					try {
						write?.();
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

