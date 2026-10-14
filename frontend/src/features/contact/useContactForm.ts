import { useState, type ChangeEvent, type FormEvent } from "react"
import { site } from "../../data/site"

// Reine Formular-Logik: Zustand, Validierung und Absenden – bewusst getrennt
// von der Darstellung (ContactForm.tsx). So bleibt die Komponente schlank und
// die Regeln lassen sich isoliert testen und wiederverwenden.

export interface ContactValues {
  name: string
  email: string
  message: string
}

type FieldName = keyof ContactValues
type ContactErrors = Partial<Record<FieldName, string>>
type Touched = Partial<Record<FieldName, boolean>>
// "mailto": kein Backend vorhanden, das E-Mail-Programm wurde geöffnet
export type ContactStatus = "idle" | "sending" | "sent" | "mailto" | "error"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10
const EMPTY: ContactValues = { name: "", email: "", message: "" }

// Das Backend nimmt die Nachricht an und verschickt sie per SMTP
// (backend/app/contact.py). Im Betrieb liegt es unter derselben Domain,
// in der Entwicklung leitet Vite /api an localhost:8000 weiter.
// Auf statischem Hosting ohne Backend (GitHub Pages) wird die Variable leer
// gesetzt. Dann öffnet das Formular das E-Mail-Programm mit der Nachricht.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/contact"

// true: Formular öffnet das E-Mail-Programm (kein Backend). Die
// Datenschutzerklärung beschreibt danach den passenden Weg.
export const kontaktPerMailprogramm = !CONTACT_ENDPOINT

function mailtoLink({ name, email, message }: ContactValues): string {
  const subject = encodeURIComponent(`Anfrage von ${name.trim()}`)
  const body = encodeURIComponent(
    [message.trim(), "", name.trim(), email.trim()].join("\n"),
  )
  return `mailto:${site.contactEmail}?subject=${subject}&body=${body}`
}

// Validiert ein einzelnes Feld und liefert eine Fehlermeldung (leer = ok).
function validateField(field: FieldName, value: string): string {
  const v = value.trim()
  switch (field) {
    case "name":
      return v ? "" : "Bitte geben Sie Ihren Namen ein."
    case "email":
      if (!v) return "Bitte geben Sie Ihre E-Mail-Adresse ein."
      return EMAIL_REGEX.test(v)
        ? ""
        : "Bitte geben Sie eine gültige E-Mail-Adresse ein."
    case "message":
      if (!v) return "Bitte schreiben Sie uns eine kurze Nachricht."
      return v.length >= MIN_MESSAGE_LENGTH
        ? ""
        : `Ihre Nachricht ist etwas kurz (mind. ${MIN_MESSAGE_LENGTH} Zeichen).`
    default:
      return ""
  }
}

function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(values) as FieldName[]) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

export function useContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Touched>({})
  const [status, setStatus] = useState<ContactStatus>("idle")
  // Honeypot: bleibt bei Menschen leer, Bots füllen es aus.
  const [website, setWebsite] = useState("")

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = event.target.name as FieldName
    const value = event.target.value
    setValues((prev) => ({ ...prev, [name]: value }))
    // Fehler live entfernen, sobald ein bereits berührtes Feld korrigiert wird.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = event.target.name as FieldName
    const value = event.target.value
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(nextErrors).length > 0) return

    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoLink(values)
      setStatus("mailto")
      return
    }

    setStatus("sending")
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website,
        }),
      })
      if (!response.ok) throw new Error(`Status ${response.status}`)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setWebsite("")
    setStatus("idle")
  }

  return {
    values,
    errors,
    status,
    website,
    setWebsite,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}
