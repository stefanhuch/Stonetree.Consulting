import type { StatistikDienst } from "../../data/einwilligung"

// Bindet das Skript des Statistikdienstes ein. Wird nur nach Einwilligung
// aufgerufen. Ein zweiter Aufruf lädt nichts doppelt.
const SKRIPT_ID = "statistik-skript"

export function ladeStatistik(dienst: StatistikDienst): void {
  if (document.getElementById(SKRIPT_ID)) return
  const skript = document.createElement("script")
  skript.id = SKRIPT_ID
  skript.src = dienst.skript
  skript.defer = true
  for (const [name, wert] of Object.entries(dienst.attribute)) {
    skript.setAttribute(name, wert)
  }
  document.head.appendChild(skript)
}

// Ein einmal geladenes Skript lässt sich nicht sauber entfernen. Wird die
// Einwilligung widerrufen, lädt die Seite deshalb neu, dann ohne Statistik.
export function statistikGeladen(): boolean {
  return document.getElementById(SKRIPT_ID) !== null
}
