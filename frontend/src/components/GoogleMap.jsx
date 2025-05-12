import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useLocation } from '@/contexts/LocationContext'

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

  const getAddress = async (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    try {
      const { results } = await geocoder.geocode({ location: latlng });

      if (results && results.length > 0) {
        setLocation(results[0].formatted_address);
      } else {
        console.log('Address not found');
      }
    } catch (error) {
      console.error('Geocoder error:', error);
      console.log('Error fetching address');
    }
  }

  const [center, setCenter] = useState(DEFAULT_COORDS)
  const { setLocation } = useLocation()

  useEffect(() => {
    if (!isLoaded) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords
        const lat = coords.latitude
        const lng = coords.longitude

        setCenter({ lat, lng })
        getAddress(lat, lng)

      }, (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          getAddress(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng)
        } else {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    }
  }, [isLoaded])

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