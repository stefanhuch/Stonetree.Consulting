import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ConsentProvider from "./features/consent/ConsentProvider"
import { akzentAnwenden } from "./features/theme/accent"
// Schrift Ubuntu aus dem eigenen Build statt von Google Fonts: Ohne
// Einwilligung darf keine IP-Adresse an Google gehen. Nur die lateinischen
// Zeichen (enthält Umlaute und ß) in den genutzten Stärken.
import "@fontsource/ubuntu/latin-300.css"
import "@fontsource/ubuntu/latin-400.css"
import "@fontsource/ubuntu/latin-400-italic.css"
import "@fontsource/ubuntu/latin-500.css"
import "@fontsource/ubuntu/latin-700.css"
import "./styles/index.css"

// Akzentfarbe setzen, bevor die Seite gezeichnet wird (Standard: Grün)
akzentAnwenden()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* basename: Unterordner beim Hosting, z. B. auf GitHub Pages */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </BrowserRouter>
  </StrictMode>,
)
