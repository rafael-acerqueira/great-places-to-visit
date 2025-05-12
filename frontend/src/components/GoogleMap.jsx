import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

function MyMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const DEFAULT_COORDS = {
    lat: -10.925624262601078,
    lng: -37.07302530353427,
  }

  const [center, setCenter] = useState(DEFAULT_COORDS)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords
      console.log(coords)
      setCenter({ lat: coords.latitude, lng: coords.longitude })
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyMapComponent)