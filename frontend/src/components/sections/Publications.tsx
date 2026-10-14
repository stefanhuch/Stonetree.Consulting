import type { FocusEvent, PointerEvent } from "react"
import ArrowLink from "../ui/ArrowLink"
import Card from "../ui/Card"
import Reveal from "../ui/Reveal"
import Section from "../ui/Section"
import SectionHead from "../ui/SectionHead"
import { publications } from "../../data/publications"
import {
  useCarousel,
  useSlidesPerView,
} from "../../features/carousel/useCarousel"
import { useSwipe } from "../../features/carousel/useSwipe"

// Startseite: alle Beiträge als Karussell. Die vollständige Liste liegt
// gebündelt im Research Lab.
export default function Publications() {
  const perView = useSlidesPerView()
  const { index, maxIndex, next, prev, goTo, pause, resume } = useCarousel({
    count: publications.length,
    perView,
  })

  const swipe = useSwipe({ onLeft: next, onRight: prev })

  // Am Handy gibt es kein Überfahren mit der Maus. Wer das Karussell antippt
  // oder wischt, will lesen: Dann bleibt es stehen.
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") pause()
  }

  // Pause nur beenden, wenn der Fokus das Karussell wirklich verlässt.
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      resume()
    }
  }

  return (
    <Section id="publikationen" tone="muted">
      <SectionHead
        kicker="Publikationen"
        title="Was wir denken und teilen"
        intro="Ausgewählte Beiträge aus dem Research Lab. Schwerpunkt Automatisierung und KI im Mittelstand."
        split
      />

      <Reveal>
        <div
          className="pub-carousel"
          role="region"
          aria-roledescription="Karussell"
          aria-label="Publikationen"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={handleBlur}
          onPointerDown={handlePointerDown}
        >
          <div className="pub-viewport" {...swipe}>
            <div
              className="pub-track"
              style={{
                transform: `translateX(calc(${-index} * (100% + var(--pub-gap)) / ${perView}))`,
              }}
            >
              {publications.map((item, i) => (
                <div
                  className="pub-slide"
                  key={item.id}
                  aria-hidden={!(i >= index && i < index + perView)}
                >
                  <Card
                    kicker={`${item.type} · ${item.date}`}
                    title={item.title}
                    text={item.teaser}
                    image={{ src: item.image, alt: item.imageAlt }}
                    link={
                      item.pdfUrl
                        ? { label: "PDF ansehen", href: item.pdfUrl }
                        : {
                            label: "Im Research Lab",
                            to: "/bereiche/research-lab#publikationen",
                          }
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="pub-controls">
              <div className="pub-dots">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`pub-dot${i === index ? " active" : ""}`}
                    aria-label={`Position ${i + 1} von ${maxIndex + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <div className="pub-arrows">
                <button
                  type="button"
                  className="pub-nav"
                  aria-label="Vorherige Publikationen"
                  onClick={prev}
                >
                  &larr;
                </button>
                <button
                  type="button"
                  className="pub-nav"
                  aria-label="Nächste Publikationen"
                  onClick={next}
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="pub-more">
        <ArrowLink to="/bereiche/research-lab#publikationen">
          Alle Publikationen im Research Lab
        </ArrowLink>
      </Reveal>
    </Section>
  )
}
