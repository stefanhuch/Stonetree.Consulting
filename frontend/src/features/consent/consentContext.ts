import { createContext, useContext } from "react"

// Gemeinsamer Zustand für Banner und Fußzeile (Link "Cookie-Einstellungen").
export interface ConsentState {
  // null: noch keine Entscheidung, das Banner ist offen
  statistik: boolean | null
  bannerOffen: boolean
  // Banner mit den Einzeleinstellungen öffnen, z. B. aus der Fußzeile
  oeffneEinstellungen: () => void
  speichern: (statistik: boolean) => void
}

export const ConsentContext = createContext<ConsentState | null>(null)

export function useConsent(): ConsentState {
  const wert = useContext(ConsentContext)
  if (!wert) throw new Error("useConsent nur innerhalb von ConsentProvider verwenden")
  return wert
}
