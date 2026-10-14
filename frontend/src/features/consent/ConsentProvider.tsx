import { useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { statistikDienst } from "../../data/einwilligung"
import { ConsentContext } from "./consentContext"
import { leseEinwilligung, speichereEinwilligung } from "./speicher"
import { ladeStatistik, statistikGeladen } from "./statistik"

// Hält die Entscheidung und lädt die Statistik erst, wenn eingewilligt wurde.
export default function ConsentProvider({ children }: { children: ReactNode }) {
  const [statistik, setStatistik] = useState<boolean | null>(
    () => leseEinwilligung()?.statistik ?? null,
  )
  const [einstellungenOffen, setEinstellungenOffen] = useState(false)

  useEffect(() => {
    if (statistik && statistikDienst) ladeStatistik(statistikDienst)
  }, [statistik])

  const speichern = useCallback((wahl: boolean) => {
    speichereEinwilligung(wahl)
    setEinstellungenOffen(false)
    // Widerruf nach dem Laden: Seite neu laden, damit das Skript weg ist
    if (!wahl && statistikGeladen()) {
      window.location.reload()
      return
    }
    setStatistik(wahl)
  }, [])

  const wert = useMemo(
    () => ({
      statistik,
      bannerOffen: statistik === null || einstellungenOffen,
      oeffneEinstellungen: () => setEinstellungenOffen(true),
      speichern,
    }),
    [statistik, einstellungenOffen, speichern],
  )

  return <ConsentContext.Provider value={wert}>{children}</ConsentContext.Provider>
}
