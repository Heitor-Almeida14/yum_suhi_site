import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const STATS = [
  { value: "4.7", label: "Nota média no Google" },
  { value: "R$ 98,90", label: "Rodízio Premium de almoço, a partir" },
  { value: "2", label: "Turnos diários: almoço e jantar" },
];

/**
 * Filosofia da casa — narrativa assimétrica com moldura deslocada e cartão flutuante.
 */
export function Filosofia() {
  return (
    <section id="filosofia" aria-label="Filosofia da casa" className="relative overflow-hidden py-28 sm:py-36">
      {/* Brilho ambiente discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-gold/5 blur-[130px]"
      />

      <div className="mx-auto grid w-full max-w-[88rem] items-center gap-16 px-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-14">
        {/* Texto */}
        <div>
          <SectionHeading eyebrow="A Casa" title={["O Rodízio que", "Virou Tradição"]} />

          <Reveal delay={200}>
            <p className="mt-10 max-w-xl text-[0.95rem] leading-[1.95] font-light text-cream/85">
              Na Av. Cupecê, o Yum Sushi transformou o rodízio japonês em ritual de bairro:
              peças que não param de chegar, montadas no momento, no ritmo de cada mesa. É
              o encontro entre a generosidade do “à vontade” e o cuidado de quem corta cada
              peça individualmente.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.95] font-light text-sand">
              No salão de madeira clara e parede viva, almoços de negócio, jantares de
              família e celebrações dividem a mesma estação do sushiman — e a mesma regra:
              nada de peça esperando. Você pede, a cozinha executa, a mesa celebra.
            </p>
          </Reveal>

          {/* Estatísticas */}
          <Reveal delay={420}>
            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-line pt-10">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display block text-3xl font-light text-gold sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-3 block text-[0.6rem] leading-relaxed font-medium tracking-[0.26em] text-sand uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Imagem com moldura deslocada + cartão flutuante.
            O cartão fica FORA do Reveal (curtain usa overflow-hidden para o
            zoom da imagem) — ele precisa transbordar o quadro por design. */}
        <div className="frame-offset relative mt-4 lg:mt-0">
          <Reveal variant="curtain" className="relative z-10">
            <img
              src="/images/filosofia.jpg"
              alt="Prato de sashimis do Yum Sushi servido sobre fundo escuro"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
          </Reveal>

          <div className="glass-card absolute -bottom-8 -left-4 z-20 max-w-[15rem] p-6 sm:-left-10">
            <p className="text-[0.58rem] font-semibold tracking-[0.36em] text-gold uppercase">
              Regra da Casa
            </p>
            <p className="font-display mt-3 text-lg leading-snug font-light text-ivory">
              “Peça feita na hora, mesa sempre servida.”
            </p>
            <p className="mt-4 text-[0.58rem] font-medium tracking-[0.3em] text-sand uppercase">
              Sobremesa inclusa em todo rodízio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
