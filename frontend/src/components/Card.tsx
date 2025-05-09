import { MapPin, Phone } from "lucide-react"
import Place from '../types/place'

type Props = {
  place: Place;
}


export default function Card({ place }: Props) {
  return (
    <section className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={place.hero_url} alt="Sunset in the mountains" />
      <section className="px-6 py-4">
        <header className="col-span-2 grid grid-cols-2 pb-2">
          <h1 className="font-bold text-md col-span-2">{place.name}</h1>
          <span className="text-sm flex gap-0.5">{place.rating}<u>({place.reviews} reviews)</u></span>
          {place.website && <a className="text-right" href={place.website}>Website</a>}
        </header>
        <footer className="border-t-1 pt-2 flex flex-col gap-1">
          <span className="text-sm flex items-center gap-0.5"><MapPin size={14} />{place.address}</span>
          <span className="text-sm flex items-center gap-0.5"><Phone size={14} />{place.phone}</span>
        </footer>
      </section>
    </section>
  )
}