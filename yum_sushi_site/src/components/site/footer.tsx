import { Instagram, MapPin, Facebook } from "lucide-react";
import { Wordmark } from "./monogram";

const MAPS_URL =
  "https://www.google.com/maps/place/Yum+Sushi/@-23.6631096,-46.6620661,17z/data=!4m6!3m5!1s0x94ce5b72ac8242eb:0xc170cc843acceea9!8m2!3d-23.6631096!4d-46.6620661!16s%2Fg%2F11wwg75p30";

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#historia", label: "Nossa História" },
  { href: "#reservas", label: "Reservas" },
];

const SERVICES = [
  { href: "#cardapio", label: "Rodízio Premium" },
  { href: "#cardapio", label: "Para Dois" },
  { href: "#reservas", label: "Reservar Mesa" },
  { href: "#contato", label: "Delivery & Retirada" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/yumsushioficialsp", label: "Instagram do Yum Sushi", Icon: Instagram },
  { href: "https://www.facebook.com/yumsushioficialsp", label: "Facebook do Yum Sushi", Icon: Facebook },
  { href: MAPS_URL, label: "Yum Sushi no Google Maps", Icon: MapPin },
];

/**
 * Rodapé minimalista com três colunas, redes sociais e barra de direitos autorais.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#070907]">
      <div className="mx-auto grid w-full max-w-[88rem] gap-14 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-20 lg:px-14">
        {/* Marca */}
        <div>
          <Wordmark />
          <p className="mt-7 max-w-sm text-[0.875rem] leading-[1.9] font-light text-sand">
            O rodízio japonês generoso da Av. Cupecê: sushi fresco, quentes e sobremesa
            inclusa — no salão, no delivery ou na retirada.
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé — navegação">
          <h2 className="text-[0.62rem] font-semibold tracking-[0.4em] text-gold uppercase">
            Navegação
          </h2>
          <ul className="mt-6 space-y-3.5">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.875rem] font-light text-cream/75 transition-colors duration-300 hover:text-gold-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Serviços + endereço */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h2 className="text-[0.62rem] font-semibold tracking-[0.4em] text-gold uppercase">
              Visite
            </h2>
            <ul className="mt-6 space-y-3.5">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[0.875rem] font-light text-cream/75 transition-colors duration-300 hover:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.62rem] font-semibold tracking-[0.4em] text-gold uppercase">
              Av. Cupecê, 2346
            </h2>
            <p className="mt-6 text-[0.875rem] leading-[1.9] font-light text-cream/75">
              Jardim Prudência
              <br />
              São Paulo — SP, 04366-000
            </p>
            <ul className="mt-6 flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-sand transition-colors duration-300 hover:border-gold/60 hover:text-gold-light"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row sm:px-10 lg:px-14">
          <p className="text-[0.62rem] tracking-[0.22em] text-sand/70 uppercase">
            © 2026 Yum Sushi · Todos os direitos reservados
          </p>
          <p className="font-display text-sm font-light tracking-[0.14em] text-gold/80 italic">
            “Sushi à vontade, feito com arte.”
          </p>
        </div>
      </div>
    </footer>
  );
}
