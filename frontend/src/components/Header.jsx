'use client'

import Link from 'next/link'
import Form from 'next/form'

import { Search } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

export default function Header() {

  const { location, setLocation } = useLocation()

  return (
    <header className="bg-emerald-500 h-16">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Great Places To Visit
        </Link>
        <div className="flex items-center justify-between w-100">
          <span>Explore new places</span>
          <Form className="relative" action="/search">
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="bg-white rounded pl-9 py-1 w-60" name="query" />
            <button className="absolute left-1 top-1 cursor-pointer" type="submit"><Search /></button>
          </Form>
        </div>
      </div>
    </header>
  )
}
