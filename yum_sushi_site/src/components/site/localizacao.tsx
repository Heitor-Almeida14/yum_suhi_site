import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const MAPS_URL =
  "https://www.google.com/maps/place/Yum+Sushi/@-23.6631096,-46.6620661,17z/data=!4m6!3m5!1s0x94ce5b72ac8242eb:0xc170cc843acceea9!8m2!3d-23.6631096!4d-46.6620661!16s%2Fg%2F11wwg75p30";

const HOURS = [
  { days: "Segunda — Quinta", time: "12h–15h · 19h–23h" },
  { days: "Sexta — Sábado", time: "12h–17h · 17h01–00h" },
  { days: "Domingo", time: "12h–17h · 17h01–23h" },
  { days: "Feriados", time: "Confira no Instagram" },
];

/**
 * Localização e contato — dados reais do Yum Sushi.
 */
export function Localizacao() {
  return (
    <section id="contato" aria-label="Localização e contato" className="py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <SectionHeading eyebrow="Localização & Contato" title={["Na Av. Cupecê,", "2346"]} align="center" />

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {/* Endereço */}
          <Reveal delay={0} className="glass-card group p-8 sm:p-10">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold/70">
              <MapPin className="h-5 w-5" strokeWidth={1.1} />
            </span>
            <h3 className="font-display mt-6 text-2xl font-light text-ivory">Endereço</h3>
            <address className="mt-4 text-[0.95rem] leading-[1.9] font-light text-cream/80 not-italic">
              Av. Cupecê, 2346 — Jardim Prudência
              <br />
              São Paulo — SP, 04366-000
            </address>
            <p className="mt-4 inline-flex items-center gap-2 border border-gold/30 px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.26em] text-gold-light uppercase">
              4.7 no Google
            </p>
            <div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold mt-7"
              >
                Ver no mapa
                <svg aria-hidden="true" className="arrow h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <span className="sr-only">Abre o Google Maps em nova aba</span>
            </div>
          </Reveal>

          {/* Horários */}
          <Reveal delay={140} className="glass-card group p-8 sm:p-10">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold/70">
              <Clock className="h-5 w-5" strokeWidth={1.1} />
            </span>
            <h3 className="font-display mt-6 text-2xl font-light text-ivory">Horários</h3>
            <dl className="mt-4 space-y-3.5">
              {HOURS.map((h) => (
                <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-3.5 last:border-0">
                  <dt className="text-[0.6rem] font-medium tracking-[0.28em] text-sand uppercase">
                    {h.days}
                  </dt>
                  <dd className="font-display text-base font-light text-ivory">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[0.58rem] leading-relaxed font-medium tracking-[0.22em] text-sand/70 uppercase">
              Almoço e jantar com horários diferentes — planeje o giro
            </p>
          </Reveal>

          {/* Contato */}
          <Reveal delay={280} className="glass-card group p-8 sm:p-10">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold/70">
              <Phone className="h-5 w-5" strokeWidth={1.1} />
            </span>
            <h3 className="font-display mt-6 text-2xl font-light text-ivory">Contato</h3>
            <ul className="mt-4 space-y-4 text-[0.95rem] font-light">
              <li>
                <a href="tel:+5511923674541" className="flex items-center gap-3 text-cream/80 transition-colors hover:text-gold-light">
                  <Phone className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.1} aria-hidden="true" />
                  +55 (11) 92367-4541
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/yumsushioficialsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/80 transition-colors hover:text-gold-light"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.1} aria-hidden="true" />
                  @yumsushioficialsp
                </a>
              </li>
            </ul>
            <p className="mt-7 border-t border-line/60 pt-5 text-[0.6rem] leading-relaxed font-medium tracking-[0.24em] text-sand/70 uppercase">
              Delivery, retirada e reservas respondidas rápido no direct
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
