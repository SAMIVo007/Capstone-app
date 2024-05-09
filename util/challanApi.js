import axios from "axios";

const API_URL = "http://192.168.18.179:3000/challan"; //home

export const addChallan = async (challan) => {
	console.log("Challan from api ", challan);
	try {
		const response = await axios.post(`${API_URL}/add`, challan);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getVehicleChallans = async (vehicleId) => {
	try {
		const response = await axios.get(`${API_URL}/view/${vehicleId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getChallansById = async (challanId) => {
	try {
		const response = await axios.get(`${API_URL}/view/${challanId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
