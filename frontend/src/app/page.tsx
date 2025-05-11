'use client'

import { useEffect, useState } from 'react';
import Card from '../components/Card'
import Place from '../types/place'
import GoogleMap from '@/components/GoogleMap';
import { useLocation } from '@/contexts/LocationContext';

export default function Home() {

  const [places, setPlaces] = useState<Place[]>([])
  const { location } = useLocation()


  const fakePlaces: Place[] = [
    {
      id: 1,
      name: "Celi Hotel",
      hero_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f1/1c/b8/celi-praia-hotel.jpg",
      rating: 5,
      reviews: 1453,
      address: 'Avenida Oceânica 500 Orla de Atalaia',
      phone: '+557932568549',
      website: "https://celihotel.com.br/celi-hotel/"
    },
    {
      id: 2,
      name: "Churrascaria Sal e Brasa Aracaju",
      hero_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/d8/df/17/fachada.jpg",
      rating: 4.3,
      reviews: 2884,
      address: 'Av. Santos Dumont, S/N Bairro Coroa do Meio',
      phone: '+557136521559',
      website: ''
    },
    {
      id: 3,
      name: "Celi Hotel",
      hero_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f1/1c/b8/celi-praia-hotel.jpg",
      rating: 5,
      reviews: 1453,
      address: 'Avenida Oceânica 500 Orla de Atalaia',
      phone: '+557932568549',
      website: "https://celihotel.com.br/celi-hotel/"
    },
    {
      id: 4,
      name: "Churrascaria Sal e Brasa Aracaju",
      hero_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/d8/df/17/fachada.jpg",
      rating: 4.3,
      reviews: 2884,
      address: 'Av. Santos Dumont, S/N Bairro Coroa do Meio',
      phone: '+557136521559',
      website: ''
    }
  ]


  useEffect(() => {
    setPlaces(fakePlaces)
  }, [])

  return (
    <>
      <section className='w-1/3 h-full overflow-y-auto'>
        {location}
        <section className='flex flex-col items-center gap-10 py-10'>
          {
            places.map(place => <Card key={place.id} place={place} />)
          }
        </section>
      </section>
      <section className='w-2/3'>
        <GoogleMap />
      </section>
    </>

  );
}
