import { EINWILLIGUNG_VERSION } from "../../data/einwilligung"

// Speichert die Entscheidung im Browser (localStorage). Die Speicherung der
// Entscheidung selbst ist unbedingt erforderlich und braucht keine
// Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG).

export interface Einwilligung {
  version: number
  statistik: boolean
  // Zeitpunkt der Entscheidung, als Nachweis
  zeitpunkt: string
}

const SCHLUESSEL = "stonetree-einwilligung"

// Liefert die gespeicherte Entscheidung oder null, wenn noch keine gültige
// vorliegt (nie gefragt, ältere Version oder Speicher gesperrt).
export function leseEinwilligung(): Einwilligung | null {
  try {
    const roh = localStorage.getItem(SCHLUESSEL)
    if (!roh) return null
    const wert = JSON.parse(roh) as Partial<Einwilligung>
    if (wert.version !== EINWILLIGUNG_VERSION || typeof wert.statistik !== "boolean") {
      return null
    }
    return { version: wert.version, statistik: wert.statistik, zeitpunkt: String(wert.zeitpunkt) }
  } catch {
    return null
  }
}

export function speichereEinwilligung(statistik: boolean): Einwilligung {
  const einwilligung: Einwilligung = {
    version: EINWILLIGUNG_VERSION,
    statistik,
    zeitpunkt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify(einwilligung))
  } catch {
    // Speicher gesperrt (privates Fenster): Die Wahl gilt dann nur bis zum
    // Neuladen, das Banner erscheint beim nächsten Besuch wieder.
  }
  return einwilligung
}
