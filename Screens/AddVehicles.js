import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Alert,
} from "react-native";
import PrimaryButton from "../Components/primaryButton";
import Colors from "../Components/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginUser, fetchUserDetails } from "../util/Api";
// import { addVehicle } from "../util/vehicleApi";
import { getSessionToken } from "../util/tokenStore";
import AddVehicle from "../Metamask/AddvehicleContract";

///////////////////

import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import addVehicleABI from "../Metamask/ABI's/addVehicleABI.json";
import Web3 from "../Metamask/WalleConnect";

////////////////////

export default function AddVehicles({ navigation }) {

	return (
		<Web3>
			<View className="flex-1">
				<Formik
					initialValues={{
						vehicleID: "",
						year: 1,
						make: "",
						model: "",
						plateNum: "",
						color: "",
						insuranceValidity: "",
						pollutionValidity: "",
					}}
					onSubmit={(values) => {
						// navigation.navigate("Contract");
						console.log(values);
					}}
				>
					{({ handleChange, handleSubmit, values, touched, errors }) => (
						<View className=" flex-1 flex-col justify-between items-center w-full h-full bg-white p-3">
							<View className=" py-24 ">
								<Text
									className="text-2xl font-bold text-center"
									style={{ color: Colors.primaryBlue }}
								>
									Add Vehicle
								</Text>
							</View>

							<View className=" flex-col w-full px-4 justify-between ">
								<View className=" pb-52  justify-between">
									<TextInput
										className=" mb-4 border-b border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Vehicle ID"
										onChangeText={handleChange("vehicleID")}
										value={values.vehicleID}
									/>
									<TextInput
										keyboardType="numeric"
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Year"
										onChangeText={handleChange("year")}
										value={values.year.toString()}
									/>
									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Make"
										onChangeText={handleChange("make")}
										value={values.make}
									/>
									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Model"
										onChangeText={handleChange("model")}
										value={values.model}
									/>

									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Enter Plate Number"
										onChangeText={handleChange("plateNum")}
										value={values.plateNum}
									/>

									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Color"
										onChangeText={handleChange("color")}
										value={values.color}
									/>

									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Enter Insurance Validity"
										onChangeText={handleChange("insuranceValidity")}
										value={values.insuranceValidity}
									/>

									<TextInput
										className=" border-b mb-4 border-gray-200 py-2 px-2 text-base text-gray-700"
										placeholder="Enter Pollution Validity"
										onChangeText={handleChange("pollutionValidity")}
										value={values.pollutionValidity}
									/>

									<View className=" my-2">
										<AddVehicle values={values} />
									</View>
								</View>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</Web3>
	);
}
