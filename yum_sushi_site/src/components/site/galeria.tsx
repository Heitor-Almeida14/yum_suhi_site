import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const FRAMES = [
  {
    src: "/images/galeria-salmao.jpg",
    alt: "Filé de salmão fresco em close sobre fundo escuro",
    caption: "Frescor · Corte do Dia",
    span: "lg:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/images/galeria-uramaki.jpg",
    alt: "Uramaki servido sobre prato branco com gengibre",
    caption: "Uramaki · Toque da Casa",
    span: "lg:col-span-5",
    ratio: "aspect-[4/3] lg:aspect-auto lg:h-full",
  },
  {
    src: "/images/galeria-cubo.jpg",
    alt: "Cubos de salmão e atum sobre gelo com limão",
    caption: "Tartare · Gelo & Cítricos",
    span: "lg:col-span-5",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/images/galeria-temaki.jpg",
    alt: "Temakis recheados sobre tábuas de madeira",
    caption: "Temaki · De Mão na Massa",
    span: "lg:col-span-7",
    ratio: "aspect-[16/9]",
  },
];

/**
 * Galeria de atmosfera — mosaico assimétrico com legendas discretas.
 */
export function Galeria() {
  return (
    <section aria-label="Atmosfera do Yum Sushi" className="pb-28 sm:pb-36">
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
        <SectionHeading eyebrow="O Dia a Dia" title={["Atmosfera", "Yum"]} align="center" />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {FRAMES.map((frame, i) => (
            <Reveal
              key={frame.src}
              variant="curtain"
              delay={i * 140}
              className={`group relative ${frame.span}`}
            >
              <div className={`img-zoom h-full w-full ${frame.ratio}`}>
                <img src={frame.src} alt={frame.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(9,12,10,0.78)_2%,transparent_40%)]"
              />
              <p className="pointer-events-none absolute bottom-5 left-6 text-[0.6rem] font-medium tracking-[0.34em] text-cream/85 uppercase">
                {frame.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
