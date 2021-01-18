import axios from 'axios';

import { WeatherData } from '../interfaces/weatherData';
import formatDate from './format';

const getWeather = async (): Promise<WeatherData[]> => {
    try {
        const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API_KEY}&feedtype=json&ver=1.0`;
        const res = await axios.get(url);
        const weather = res.data;

        const Finaldata = weather.sol_keys.map((solKey: string) => (
            {
                sol: solKey,
                maxTemp: weather[solKey].AT?.mx || 'No data',
                minTemp: weather[solKey].AT?.mn || 'No data',
                windSpeed: Math.round(weather[solKey].HWS?.av || 0),
                windDirectionDegrees: weather[solKey].WD?.most_common?.compass_degrees || 0,
                windDirectionCardinal: weather[solKey].WD?.most_common?.compass_point || 'No data',
                date: formatDate(new Date(weather[solKey].First_UTC)),
            }
        ));

        return Finaldata;
    } catch (e) {
        console.log(e);
        throw new Error('Request failed ):');
    }
};

export default getWeather;
