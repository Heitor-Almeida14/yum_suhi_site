"use client";

import { useState } from "react";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

interface MenuItem {
  name: string;
  note: string;
  description: string;
  vegetarian?: boolean;
  signature?: boolean;
}

interface MenuCategory {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
}

const RODIZIO_PRICES = [
  { label: "Rodízio Premium · Almoço", price: "R$ 98,90", detail: "Todos os dias, no salão" },
  { label: "Rodízio Premium · Jantar seg–qui", price: "R$ 119,90", detail: "Segunda a quinta à noite" },
  { label: "Rodízio Premium · Jantar sex–dom", price: "R$ 129,90", detail: "Sexta, sábado, domingo e feriados" },
];

const RODIZIO_EXTRAS = [
  { label: "Casal · Almoço (seg–sex)", price: "R$ 159,90" },
  { label: "Para 2 · Jantar (seg–qui)", price: "R$ 197,90" },
];

const MENU: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas & Caldos",
    note: "Para abrir o apetite",
    items: [
      {
        name: "Sunomono",
        note: "Incluído",
        description: "Pepino agridoce com gergelim, toque de gengibre e hortelã.",
        vegetarian: true,
      },
      {
        name: "Gyoza da Casa",
        note: "Incluído",
        description: "5 unidades grelhadas, recheadas de frango, com molho ponzu.",
        signature: true,
      },
      {
        name: "Missoshiro",
        note: "Incluído",
        description: "Caldo quente de pasta de soja com tofu, wakame e cebolinha.",
        vegetarian: true,
      },
      {
        name: "Carpaccio de Salmão",
        note: "Incluído",
        description: "Lâminas finas com azeite cítrico, alcaparras e cebolinha.",
        signature: true,
      },
    ],
  },
  {
    id: "sushis",
    label: "Sushis & Niguiris",
    note: "O coração do rodízio",
    items: [
      {
        name: "Niguiri de Salmão",
        note: "Incluído",
        description: "Lâmina grossa sobre arroz avinagrado, wasabi fresco na união.",
        signature: true,
      },
      {
        name: "Niguiri de Atum",
        note: "Incluído",
        description: "Corte nobre de atum com acabamento de gengibre.",
      },
      {
        name: "Uramaki Filadélfia",
        note: "Incluído",
        description: "Salmão, cream cheese e cebolinha em gergelim tostado.",
      },
      {
        name: "Hossomaki do Dia",
        note: "Incluído",
        description: "Pepino, salmão ou atum enrolados em alga nori crocante.",
        vegetarian: true,
      },
    ],
  },
  {
    id: "sashimis",
    label: "Sashimis",
    note: "Cortes grossos, sem arroz",
    items: [
      {
        name: "Sashimi de Salmão",
        note: "Incluído",
        description: "Fatias generosas com raspa de limão-siciliano.",
        signature: true,
      },
      {
        name: "Sashimi de Atum",
        note: "Incluído",
        description: "Corte liso e firme, servido gelado com wasabi.",
      },
      {
        name: "Sashimi de Peixe Branco",
        note: "Incluído",
        description: "Leve e delicado, com fio de azeite e sal marinho.",
      },
      {
        name: "Combinado de Sashimis",
        note: "Incluído",
        description: "Seleção da estação sobre gelo, para dividir sem discutir.",
        signature: true,
      },
    ],
  },
  {
    id: "temakis",
    label: "Temakis & Makis",
    note: "De mão, sem cerimônia",
    items: [
      {
        name: "Temaki de Salmão",
        note: "Incluído",
        description: "Casquinha crocante com salmão, cream cheese e cebolinha.",
        signature: true,
      },
      {
        name: "Temaki de Atum Picado",
        note: "Incluído",
        description: "Atum em cubos com cebolinha e toque de molho tarê.",
      },
      {
        name: "Temaki Skin",
        note: "Incluído",
        description: "Pele de salmão crocante com arroz e molho da casa.",
      },
      {
        name: "California Roll",
        note: "Incluído",
        description: "Kani, pepino, abacate e gergelim no exterior.",
      },
    ],
  },
  {
    id: "quentes",
    label: "Quentes",
    note: "Do fogo direto para a mesa",
    items: [
      {
        name: "Hot Roll Filadélfia",
        note: "Incluído",
        description: "Salmão e cream cheese empanados, com tarê e gergelim.",
        signature: true,
      },
      {
        name: "Yakissoba",
        note: "Incluído",
        description: "Macarrão salteado com legumes, frango e molho oriental.",
      },
      {
        name: "Harumaki",
        note: "Incluído",
        description: "Rolinho primavera crocante com recheio de legumes.",
        vegetarian: true,
      },
      {
        name: "Gyoza Grelhada",
        note: "Incluído",
        description: "Empanadinho japonês com crosta dourada no vapor e frigideira.",
      },
    ],
  },
  {
    id: "doces",
    label: "Sobremesas & Bebidas",
    note: "O final doce está incluso",
    items: [
      {
        name: "Sobremesa do Rodízio",
        note: "Inclusa",
        description: "Sobremesa da casa servida ao final do rodízio, sem custo extra.",
        signature: true,
      },
      {
        name: "Sorvete & Mochi",
        note: "Incluso",
        description: "Sorvete de matcha e mochis assorted para dividir.",
      },
      {
        name: "Bebidas da Casa",
        note: "À parte",
        description: "Saquês, drinks orientais, sucos e refrigerantes no balcão.",
      },
      {
        name: "Chá & Café",
        note: "À parte",
        description: "Chá verde quente e café para encerrar a conversa.",
      },
    ],
  },
];

/**
 * Prévia do rodízio — valores oficiais + abas por categoria.
 * Itens ilustrativos do formato; valores conforme publicação oficial do Yum Sushi.
 */
export function Cardapio() {
  const [active, setActive] = useState(MENU[0].id);
  const category = MENU.find((c) => c.id === active) ?? MENU[0];

  return (
    <section id="cardapio" aria-label="Prévia do cardápio" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-gold/[0.05] blur-[150px]"
      />

      <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
        <SectionHeading eyebrow="O Rodízio" title={["A Carta do", "Yum"]} align="center" />

        <Reveal delay={200}>
          <p className="mx-auto mt-9 max-w-xl text-center text-[0.95rem] leading-[1.9] font-light text-sand">
            Um único preço, um mar inteiro: você pede, a cozinha repõe. Bebidas à parte,
            sobremesa inclusa — e ninguém sai de mesa com fome.
          </p>
        </Reveal>

        {/* Valores oficiais do rodízio */}
        <Reveal delay={260}>
          <div className="glass-card mx-auto mt-12 max-w-3xl p-7 sm:p-9">
            <p className="flex items-center justify-center gap-3 text-[0.62rem] font-semibold tracking-[0.36em] text-gold uppercase">
              <Sparkles className="h-4 w-4" strokeWidth={1.2} aria-hidden="true" />
              Valores oficiais do rodízio
            </p>
            <dl className="mt-7 grid gap-7 sm:grid-cols-3">
              {RODIZIO_PRICES.map((item) => (
                <div key={item.label} className="text-center">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="font-display block text-3xl font-light text-gold-light">
                      {item.price}
                    </span>
                    <span className="mt-2 block text-[0.6rem] font-semibold tracking-[0.22em] text-ivory/80 uppercase">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-[0.58rem] font-medium tracking-[0.2em] text-sand uppercase">
                      {item.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-line pt-6">
              {RODIZIO_EXTRAS.map((extra) => (
                <p key={extra.label} className="text-[0.62rem] tracking-[0.18em] text-cream/80 uppercase">
                  {extra.label} · <span className="font-display text-base text-gold-light normal-case italic">{extra.price}</span>
                </p>
              ))}
            </div>
            <p className="mt-5 text-center text-[0.58rem] leading-relaxed font-medium tracking-[0.24em] text-sand/80 uppercase">
              Conforme publicação oficial do Yum Sushi — confirme diários e feriados no Instagram
            </p>
          </div>
        </Reveal>

        {/* Abas */}
        <Reveal delay={280}>
          <div
            role="tablist"
            aria-label="Categorias do cardápio"
            className="mt-14 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {MENU.map((cat) => {
              const selected = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActive(cat.id)}
                  className={`border px-5 py-3 text-[0.62rem] font-medium tracking-[0.3em] uppercase transition-all duration-400 sm:px-7 ${
                    selected
                      ? "border-gold/70 bg-gold/10 text-gold-light"
                      : "border-line text-sand hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Painel */}
        <div
          key={category.id}
          role="tabpanel"
          id={`panel-${category.id}`}
          aria-labelledby={`tab-${category.id}`}
          className="mt-14"
        >
          <p className="text-center text-[0.6rem] font-medium tracking-[0.4em] text-gold/70 uppercase">
            {category.note}
          </p>

          <ul className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {category.items.map((item, i) => (
              <li
                key={item.name}
                className="group animate-[hero-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_both] border-b border-line/70 pb-9"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display flex flex-wrap items-center gap-3 text-[1.45rem] leading-snug font-light text-ivory transition-colors duration-300 group-hover:text-gold-light">
                    {item.name}
                    {item.signature && (
                      <span className="border border-gold/40 px-2 py-0.5 text-[0.52rem] font-semibold tracking-[0.28em] text-gold uppercase">
                        Da casa
                      </span>
                    )}
                    {item.vegetarian && (
                      <Leaf
                        className="h-3.5 w-3.5 text-gold/70"
                        strokeWidth={1.5}
                        aria-label="Opção vegetariana"
                      />
                    )}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mx-1 hidden flex-1 border-b border-dotted border-line-strong sm:block"
                  />
                  <span className="font-display shrink-0 text-lg font-light text-gold-light italic">
                    {item.note}
                  </span>
                </div>
                <p className="mt-2.5 max-w-md text-[0.875rem] leading-relaxed font-light text-cream/70">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={160} className="mt-14 flex flex-col items-center gap-5">
          <a href="#reservas" className="btn-outline">
            <span>Reservar para o Rodízio</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
          <p className="max-w-xl text-center text-[0.6rem] font-medium leading-relaxed tracking-[0.24em] text-sand/70 uppercase">
            Seleção ilustrativa do formato rodízio — a carta completa muda conforme o dia
            e as chegadas. Consulte o Instagram @yumsushioficialsp
          </p>
        </Reveal>
      </div>
    </section>
  );
}
