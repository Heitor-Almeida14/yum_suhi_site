import { Accessibility, Bike, Clock, UtensilsCrossed } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const VALUES = [
  {
    icon: UtensilsCrossed,
    title: "Rodízio Completo",
    text: "Niguiris, sashimis, temakis, uramakis e quentes em loop contínuo — com sobremesa inclusa no final.",
  },
  {
    icon: Clock,
    title: "Almoço & Jantar",
    text: "Dois turnos diários para o rodízio caber no seu dia, do domingo apressado à sexta comemorativa.",
  },
  {
    icon: Accessibility,
    title: "Para Todos",
    text: "Entrada, banheiro e assentos acessíveis, com estacionamento — a mesa inteira entra sem obstáculos.",
  },
  {
    icon: Bike,
    title: "Yum em Casa",
    text: "Delivery e retirada no balcão: o rodízio vira combo e chega embalado para render onde você estiver.",
  },
];

/**
 * Nossa história — narrativa editorial com imagem real e pilares da casa.
 */
export function Historia() {
  return (
    <section id="historia" aria-label="Nossa história" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-32 h-[26rem] w-[26rem] rounded-full bg-gold/[0.04] blur-[130px]"
      />

      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Composição de imagens sobreposta */}
          <div className="relative">
            <Reveal variant="curtain" className="relative z-10 w-[86%]">
              <img
                src="/images/historia.jpg"
                alt="Tábua de niguiris do Yum Sushi sobre pedra escura, com gengibre e wasabi"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </Reveal>

            <Reveal
              variant="curtain"
              delay={260}
              className="glass-card absolute -right-2 bottom-10 z-20 w-[52%] p-3 sm:right-0"
            >
              <img
                src="/images/salao-real.jpg"
                alt="Salão do Yum Sushi com a parede verde e o letreiro iluminado"
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </Reveal>

            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-10 right-0 z-20 text-[7rem] leading-none font-light text-gold/20 italic sm:-top-12 sm:text-[9rem]"
            >
              Yum
            </span>
          </div>

          {/* Texto + pilares */}
          <div>
            <SectionHeading eyebrow="Nossa História" title={["Na Esquina do", "Cupecê"]} />

            <Reveal delay={200}>
              <p className="mt-10 max-w-xl text-[0.95rem] leading-[1.95] font-light text-cream/85">
                O Yum Sushi nasceu com uma ideia simples e teimosa: o rodízio japonês não
                precisava ser caro para ser memorável. Na esquina da Av. Cupecê, no Jardim
                Prudência, a casa montou um salão de madeira clara e parede viva — e colocou
                o sushiman no centro do movimento.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.95] font-light text-sand">
                Virou ponto de encontro da vizinhança: almoço corrido de quarta, jantar de
                sexta, celebração de domingo. A nota 4.7 no Google é o retrato dessa
                frequência — quem chega pela primeira vez volta com a família na semana
                seguinte.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {VALUES.map((value, i) => (
                <Reveal as="li" key={value.title} delay={i * 120} className="group">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold/70 group-hover:text-gold-light"
                  >
                    <value.icon className="h-5 w-5" strokeWidth={1.1} />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-light text-ivory">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed font-light text-sand">
                    {value.text}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
