import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

interface Dish {
  name: string;
  price: string;
  description: string;
  image: string;
  alt: string;
}

const FEATURED: Dish = {
  name: "Combinado Yum",
  price: "Incluído no rodízio",
  description:
    "O percurso completo do mar em uma única travessa: niguiris, uramakis, peças leves e os clássicos da casa para dividir.",
  image: "/images/prato-combinado.jpg",
  alt: "Combinado de sushis variados do Yum Sushi com hashis sobre prato claro",
};

const DISHES: Dish[] = [
  {
    name: "Niguiris Clássicos",
    price: "Incluído no rodízio",
    description: "Salmão, atum e peixe branco sobre arroz levemente avinagrado, com wasabi fresco.",
    image: "/images/prato-nigiri.jpg",
    alt: "Niguiris com hashis apoiados sobre prato escuro",
  },
  {
    name: "Sashimi na Lâmina",
    price: "Incluído no rodízio",
    description: "Cortes generosos de salmão e atum, servidos no ponto com raspa de limão-siciliano.",
    image: "/images/prato-sashimi.jpg",
    alt: "Leque de sashimis de salmão e atum sobre prato negro",
  },
  {
    name: "Uramaki Especial",
    price: "Incluído no rodízio",
    description: "Camarão, cream cheese e cebolinha, enrolados em gergelim tostado e molho da casa.",
    image: "/images/prato-uramaki.jpg",
    alt: "Uramakis coloridos sobre prato de pedra com fios de vegetais",
  },
];

/**
 * Pratos autorais — grade editorial assimétrica com zoom sutil ao passar o cursor.
 */
export function Pratos() {
  return (
    <section id="pratos" aria-label="Pratos da casa" className="py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <SectionHeading eyebrow="Criações do Sushiman" title={["O Repertório", "do Yum"]} />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Prato em destaque */}
          <Reveal variant="curtain" className="group relative">
            <a
              href="#cardapio"
              className="img-zoom block h-full min-h-[26rem] lg:min-h-[38rem]"
              aria-label={`Ver ${FEATURED.name} no cardápio`}
            >
              <img
                src={FEATURED.image}
                alt={FEATURED.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </a>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(9,12,10,0.92)_4%,rgba(9,12,10,0.25)_45%,transparent_70%)]"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-[0.6rem] font-semibold tracking-[0.36em] text-gold uppercase">
                Prato da Casa
              </p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-3xl font-light text-ivory sm:text-4xl">
                  {FEATURED.name}
                </h3>
                <span className="font-display text-xl font-light text-gold-light italic">
                  {FEATURED.price}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed font-light text-cream/80">
                {FEATURED.description}
              </p>
              <span className="link-gold mt-5 hidden sm:inline-flex">
                Ver no cardápio <ArrowRight className="arrow h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </div>
          </Reveal>

          {/* Coluna com dois pratos */}
          <div className="grid gap-6">
            {DISHES.slice(0, 2).map((dish, i) => (
              <Reveal key={dish.name} variant="curtain" delay={i * 150} className="group relative">
                <a
                  href="#cardapio"
                  className="img-zoom block h-full min-h-[17rem] lg:min-h-[18.7rem]"
                  aria-label={`Ver ${dish.name} no cardápio`}
                >
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </a>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(9,12,10,0.9)_2%,rgba(9,12,10,0.2)_48%,transparent_72%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-light text-ivory sm:text-[1.7rem]">
                      {dish.name}
                    </h3>
                    <span className="font-display text-lg font-light text-gold-light italic">
                      {dish.price}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed font-light text-cream/75">
                    {dish.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Temaki em split editorial com imagem retrato */}
        <Reveal variant="curtain" delay={120} className="group relative mt-6">
          <div className="grid lg:grid-cols-5">
            <a
              href="#cardapio"
              className="img-zoom block lg:col-span-2"
              aria-label={`Ver ${DISHES[2].name} no cardápio`}
            >
              <img
                src="/images/prato-temaki.jpg"
                alt="Temaki de salmão segurado na mão, com uramakis ao fundo"
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[26rem]"
              />
            </a>
            <div className="flex flex-col justify-center border border-line/70 p-8 sm:p-12 lg:col-span-3 lg:p-16">
              <p className="text-[0.6rem] font-semibold tracking-[0.36em] text-gold uppercase">
                O Favorito da Mesa
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <h3 className="font-display text-3xl font-light text-ivory sm:text-4xl">
                  Temaki na Mão
                </h3>
                <span className="font-display text-xl font-light text-gold-light italic">
                  Incluído no rodízio
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-cream/80">
                Casquinha crocante montada na hora, recheada até a borda com salmão, cream
                cheese e cebolinha — peça quantos quiser, do primeiro ao último giro.
              </p>
              <div className="rule-diamond mt-8" aria-hidden="true">
                <i />
              </div>
              <a href="#cardapio" className="link-gold mt-8">
                Explorar o rodízio completo
                <ArrowRight className="arrow h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10 flex justify-center">
          <p className="text-[0.6rem] font-medium tracking-[0.3em] text-sand/70 uppercase">
            Pratos do formato rodízio — a seleção muda conforme o dia
          </p>
        </Reveal>
      </div>
    </section>
  );
}
