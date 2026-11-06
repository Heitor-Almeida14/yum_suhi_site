import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  /** Linhas do título; a última linha é exibida em itálico dourado quando `italicLast` */
  title: [string, string];
  italicLast?: boolean;
  align?: "left" | "center";
  className?: string;
}

/**
 * Cabeçalho editorial das seções: eyebrow com filete, título serifado em duas linhas
 * e divisor com losango central.
 */
export function SectionHeading({
  eyebrow,
  title,
  italicLast = true,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "flex flex-col items-center text-center" : ""} ${className}`}>
      <Reveal variant="fade" className="flex items-center gap-4">
        <span aria-hidden="true" className="hidden h-px w-14 bg-gradient-to-r from-transparent to-[rgba(95,189,131,0.55)] sm:block" />
        <p className="eyebrow">{eyebrow}</p>
        {centered && (
          <span aria-hidden="true" className="hidden h-px w-14 bg-gradient-to-l from-transparent to-[rgba(95,189,131,0.55)] sm:block" />
        )}
      </Reveal>

      <Reveal delay={120}>
        <h2 className="font-display mt-6 text-[2.6rem] leading-[1.04] font-light tracking-[0.01em] text-ivory sm:text-5xl lg:text-[3.75rem]">
          {title[0]}
          <br />
          <span className={italicLast ? "italic font-light text-gold" : "text-gold"}>
            {title[1]}
          </span>
        </h2>
      </Reveal>

      <Reveal delay={240} className="mt-8 w-full">
        <div className={`rule-diamond ${centered ? "justify-center" : ""}`} aria-hidden="true">
          <i />
        </div>
      </Reveal>
    </div>
  );
}
