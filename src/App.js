import { useState } from 'react';
import './App.css';
import Search from './components/search/Search';
import Forecast from './components/forecast/Forecast';
import Map from './components/map/Map';
import CurrentWeather from './components/current-weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);

	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherReponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({
					city: searchData.label,
					...weatherReponse,
				});
				setForecast({ city: searchData.label, ...forecastResponse });
			})
			.catch((err) => console.log(err));
	};

	// console.log(currentWeather);
	// console.log(forecast);
	return (
		<div className="container">
			<div className="section-1">
				<div>
					<Search onSearchChange={handleOnSearchChange} />
					{currentWeather && <Map data={currentWeather} />}
				</div>
				<div>
					{currentWeather && <CurrentWeather data={currentWeather} />}
				</div>
				{forecast && <Forecast data={forecast} />}
			</div>
		</div>
	);
}

export default App;
