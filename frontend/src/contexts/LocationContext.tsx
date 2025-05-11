'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type LocationContextType = {
  location: string
  setLocation: (value: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState('')

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useLocation must be used within a LocationProvider')
  return context
}