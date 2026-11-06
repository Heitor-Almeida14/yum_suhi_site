import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

interface Act {
  numeral: string;
  eyebrow: string;
  title: [string, string];
  text: string;
  caption: string;
  image: string;
  alt: string;
  portrait?: boolean;
}

const ACTS: Act[] = [
  {
    numeral: "I",
    eyebrow: "A Estação do Sushiman",
    title: ["O Sushiman em", "Movimento"],
    text: "De frente para o balcão, a estação do sushiman trabalha em loop: arroz no ponto, faca afiada e peças montadas uma a uma. No rodízio, nada fica pronto esperando — o corte acontece quando o pedido chega, e a mesa escolhe o próximo capítulo sem pressa.",
    caption: "Cortes na hora · peça a peça · arroz avinagrado no ponto",
    image: "/images/cozinha.jpg",
    alt: "Sushiman trabalhando atrás do balcão de madeira do Yum Sushi",
    portrait: true,
  },
  {
    numeral: "II",
    eyebrow: "O Salão Verde",
    title: ["Um Salão que", "Respira Verde"],
    text: "A parede viva com o letreiro YUM SUSHI é a assinatura da casa: madeira clara, bancos acolchoados e uma iluminação que deixa tudo acolhedor sem esconder o peixe. Mesas para casais, grupos e famílias — e espaço acessível, com entrada, banheiro e estacionamento adaptados.",
    caption: "Parede viva · madeira clara · acessibilidade completa",
    image: "/images/salao-real.jpg",
    alt: "Salão real do Yum Sushi com parede verde e letreiro iluminado",
    portrait: true,
  },
  {
    numeral: "III",
    eyebrow: "Delivery & Retirada",
    title: ["Do Balcão à", "Sua Porta"],
    text: "Preferiu ficar em casa? O mesmo rodízio vira combo: caixas montadas na hora com a seleção fria, os quentes embalados separadamente para chegar crocante, e a retirada no balcão para quem passa na Av. Cupecê. É só chamar no WhatsApp ou no Instagram.",
    caption: "Delivery · retirada no balcão · embalagem pensada",
    image: "/images/delivery.jpg",
    alt: "Caixa para viagem do Yum Sushi repleta de peças de sushi",
  },
];

/**
 * Experiência — três atos alternados, cada um com composição própria.
 */
export function Experiencia() {
  return (
    <section id="experiencia" aria-label="A experiência Yum Sushi" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-gold/[0.04] blur-[140px]"
      />

      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <SectionHeading eyebrow="A Experiência" title={["Três Jeitos de", "Viver o Yum"]} align="center" />

        <div className="mt-24 space-y-24 sm:space-y-32">
          {ACTS.map((act, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={act.numeral}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Imagem */}
                <Reveal
                  variant="curtain"
                  className={`frame-offset relative ${reversed ? "lg:translate-x-6" : ""}`}
                >
                  <div className="relative z-10">
                    <img
                      src={act.image}
                      alt={act.alt}
                      loading="lazy"
                      className={`w-full object-cover ${
                        act.portrait
                          ? "aspect-[3/4] lg:aspect-[4/5]"
                          : "aspect-[4/3] lg:aspect-[6/5]"
                      }`}
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-display absolute -top-7 left-2 z-20 text-6xl font-light text-gold/25 italic sm:text-7xl"
                  >
                    {act.numeral}
                  </span>
                </Reveal>

                {/* Texto */}
                <div className={reversed ? "lg:pr-6" : "lg:pl-6"}>
                  <Reveal variant={reversed ? "left" : "right"}>
                    <p className="eyebrow">{act.eyebrow}</p>
                  </Reveal>
                  <Reveal delay={120}>
                    <h3 className="font-display mt-5 text-3xl leading-[1.06] font-light text-ivory sm:text-4xl lg:text-[2.9rem]">
                      {act.title[0]}
                      <br />
                      <span className="italic text-gold">{act.title[1]}</span>
                    </h3>
                  </Reveal>
                  <Reveal delay={220}>
                    <p className="mt-7 max-w-xl text-[0.95rem] leading-[1.95] font-light text-cream/85">
                      {act.text}
                    </p>
                  </Reveal>
                  <Reveal delay={320}>
                    <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 text-[0.6rem] font-medium tracking-[0.28em] text-sand uppercase">
                      <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold/80" />
                      {act.caption}
                    </p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
