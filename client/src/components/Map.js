import React, {useState, useRef, useEffect} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFncmVkYTE2IiwiYSI6ImNreWl2bzU4cDA4M2kydnAwY3dvOGdpODQifQ.iBoVrCMWdLR6mplg3xQ1cw'

function Map () {
  const mapContainer = React.createRef()
  const map = React.createRef();
  const [lng, setLng] = useState(-73.984016);
  const [lat, setLat] = useState(40.7831);
  const [zoom, setZoom] = useState(10);


  useEffect(()=>{
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; 
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  console.log('LAT', lat, 'LNG', lng)
  });

  return (
    <div ref={mapContainer} className='sidebar'>
      Longitude: {lng} | Latitude {lat} | Zoom {zoom}
    </div>
  )
}

export default Map;


