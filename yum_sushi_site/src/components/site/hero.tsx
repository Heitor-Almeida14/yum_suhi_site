"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Clock, Star, UtensilsCrossed } from "lucide-react";

const HERO_CARDS = [
  {
    icon: Star,
    top: "4.7 / 5",
    title: "Nota no Google",
    sub: "Avaliações de quem já provou",
    stars: true,
  },
  {
    icon: Clock,
    top: "Almoço & Jantar",
    title: "Dois turnos diários",
    sub: "Confira os horários da semana",
    stars: false,
  },
  {
    icon: UtensilsCrossed,
    top: "Rodízio Premium",
    title: "A partir de R$ 98,90",
    sub: "Sobremesa inclusa · bebidas à parte",
    stars: false,
  },
];

/**
 * Abertura cinematográfica em tela cheia com parallax sutil e entrada orquestrada.
 */
export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="inicio" aria-label="Apresentação" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Fundo com ken-burns + parallax */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <div className="img-zoom absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt=""
            fetchPriority="high"
            className="anim-ken-burns h-full w-full scale-[1.14] object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(9,12,10,0.96)_0%,rgba(9,12,10,0.82)_38%,rgba(9,12,10,0.42)_62%,rgba(9,12,10,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#090C0A_2%,transparent_36%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-1 items-center px-6 pt-32 pb-24 sm:px-10 lg:px-14">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* Coluna principal */}
          <div className="max-w-2xl">
            <p className="anim-hero-rise flex items-center gap-4" style={{ "--d": "150ms" } as React.CSSProperties}>
              <span aria-hidden="true" className="anim-hero-line h-px w-12 bg-gold/70" />
              <span className="eyebrow">Rodízio Japonês · São Paulo</span>
            </p>

            <h1
              className="font-display anim-hero-rise mt-7 text-[3.4rem] leading-[0.98] font-light text-ivory sm:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem]"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              Sushi à Vontade,
              <br />
              <span className="italic text-gold-gradient">Feito com Arte</span>
            </h1>

            <div
              className="anim-hero-rise mt-9 flex items-center gap-4"
              style={{ "--d": "450ms" } as React.CSSProperties}
              aria-hidden="true"
            >
              <span className="h-px w-14 bg-line-strong" />
              <i className="h-[7px] w-[7px] rotate-45 bg-gold" />
              <span className="h-px w-24 bg-line-strong" />
            </div>

            <p
              className="anim-hero-rise mt-9 max-w-xl text-[0.95rem] leading-[1.9] font-light text-cream/85 sm:text-base"
              style={{ "--d": "560ms" } as React.CSSProperties}
            >
              No Yum Sushi, o rodízio é completo: niguiris, sashimis, temakis, hot rolls e
              pratos quentes que não param de chegar, no ritmo da sua mesa — com sobremesa
              inclusa e o frescor que virou tradição na Av. Cupecê.
            </p>

            <div
              className="anim-hero-rise mt-11 flex flex-col gap-4 sm:flex-row"
              style={{ "--d": "680ms" } as React.CSSProperties}
            >
              <a href="#reservas" className="btn-gold">
                <span>Reservar uma Mesa</span>
              </a>
              <a href="#cardapio" className="btn-outline">
                <span>Ver o Rodízio</span>
              </a>
            </div>

            <ul
              className="anim-hero-rise mt-12 flex flex-wrap gap-x-10 gap-y-4"
              style={{ "--d": "800ms" } as React.CSSProperties}
            >
              {["Sobremesa Inclusa", "Delivery & Retirada", "Estacionamento"].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[0.6rem] font-medium tracking-[0.34em] text-sand uppercase"
                >
                  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold/80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cartões de vidro */}
          <div className="hidden flex-col gap-5 lg:flex" aria-label="Destaques">
            {HERO_CARDS.map((card, i) => (
              <div
                key={card.top}
                className="glass-card anim-hero-rise group flex items-center gap-6 p-6"
                style={{ "--d": `${900 + i * 140}ms` } as React.CSSProperties}
              >
                <div className="min-w-0 flex-1">
                  {card.stars ? (
                    <p className="font-display text-2xl font-light text-gold-light">{card.top}</p>
                  ) : (
                    <p className="text-[0.6rem] font-semibold tracking-[0.34em] text-gold uppercase">
                      {card.top}
                    </p>
                  )}
                  {card.stars && (
                    <p className="mt-1.5 flex gap-1" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 fill-gold text-gold" strokeWidth={1} />
                      ))}
                    </p>
                  )}
                  <p className="font-display mt-2 truncate text-xl font-light text-ivory">
                    {card.title}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-medium tracking-[0.28em] text-sand uppercase">
                    {card.sub}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 group-hover:border-gold/70 group-hover:text-gold-light"
                >
                  <card.icon className="h-5 w-5" strokeWidth={1.25} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div className="relative z-10 flex justify-center pb-8">
        <a
          href="#filosofia"
          aria-label="Rolar para a próxima seção"
          className="anim-scroll-cue flex flex-col items-center gap-2 text-sand transition-colors duration-300 hover:text-gold-light"
        >
          <span className="text-[0.58rem] font-medium tracking-[0.42em] uppercase">Deslize</span>
          <ChevronDown className="h-4 w-4" strokeWidth={1.25} />
        </a>
      </div>
    </section>
  );
}
