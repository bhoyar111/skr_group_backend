import axios from 'axios';
import { checkDataIsValid } from '../custom/secure';

export const weatherService = async (latLonData) => {
    try {
		const { lat, lon } = latLonData;
		const appId = `${process.env.WEATHER_KEY}&units=metric`;

		const finalURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
		const weatherResult = await axios.get(finalURL);
		const { status, data } = weatherResult; // data
		if (status === 200 ) {
            if (checkDataIsValid(data)) {
                return { status: true, data };
            }
		}
        return { status: false, message: "Server error" };
    } catch (e) {
        const { response } = e;
        const { status, data } = response;
        if (checkDataIsValid(data) && data.message && data.message !== '') {
            return { status: false, message: data.message };
        }
        return { status: false, message: "Server error" };
    }
}