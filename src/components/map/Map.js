import { useEffect } from 'react';

const Map = ({ data }) => {
	useEffect(() => {
		const ifameData = document.getElementById('iframeId');
		const lat = data.coord.lat;
		const lon = data.coord.lon;
		ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
	});
	return (
		<div>
			<iframe
				title="map"
				id="iframeId"
				height="300px"
				width="100%"
			></iframe>
		</div>
	);
};

export default Map;
