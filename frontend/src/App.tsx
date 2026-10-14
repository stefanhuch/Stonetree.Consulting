import { useEffect, useRef } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import PillarPage from "./pages/PillarPage"
import KarrierePage from "./pages/KarrierePage"
import MarkePage from "./pages/MarkePage"
import ImpressumPage from "./pages/ImpressumPage"
import DatenschutzPage from "./pages/DatenschutzPage"
import CookieBanner from "./features/consent/CookieBanner"
import NotFoundPage from "./pages/NotFoundPage"

// Sorgt dafür, dass bei jedem Seitenwechsel sinnvoll gescrollt wird:
// zu einem Anker (#expertise), falls vorhanden, sonst nach ganz oben.
// Ändert sich nur die Adresszeile (z. B. beim Filtern der Stellenliste),
// bleibt die Seite stehen.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const letzterPfad = useRef<string | null>(null)

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        letzterPfad.current = pathname
        return
      }
    }
    if (letzterPfad.current !== pathname) {
      window.scrollTo({ top: 0, left: 0 })
    }
    letzterPfad.current = pathname
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/karriere" element={<KarrierePage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          {/* Interne Vorschau der Logo-Varianten */}
          <Route path="/marke" element={<MarkePage />} />
          {/* Alte Bereichs-Pfade weiterleiten, damit keine Links ins Leere laufen */}
          <Route
            path="/bereiche/beratung"
            element={<Navigate to="/bereiche/consulting" replace />}
          />
          <Route
            path="/bereiche/ai-automation"
            element={<Navigate to="/bereiche/ki-automatisierung" replace />}
          />
          <Route path="/bereiche/:slug" element={<PillarPage />} />
          {/* Branchen gibt es nicht mehr: alte Links landen auf der Startseite */}
          <Route path="/branchen/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
