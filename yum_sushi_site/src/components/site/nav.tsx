"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./monogram";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#historia", label: "Nossa História" },
  { href: "#contato", label: "Contato" },
];

/**
 * Navegação fixa: transparente sobre o hero, com fundo sólido após a rolagem.
 * Inclui menu mobile em tela cheia com transição suave.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body com o menu aberto + tecla ESC
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line bg-[rgba(9,12,10,0.88)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex h-[5.5rem] w-full max-w-[88rem] items-center justify-between px-6 sm:px-10 lg:px-14"
        >
          <a
            href="#inicio"
            aria-label="Yum Sushi — voltar ao início"
            onClick={close}
            className="shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[0.65rem] font-medium tracking-[0.32em] text-ivory/85 uppercase transition-colors duration-300 hover:text-gold-light"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#reservas"
              className="btn-outline hidden !px-7 !py-3.5 md:inline-flex"
            >
              Reservar Mesa
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label="Abrir menu"
              className="flex h-11 w-11 items-center justify-center border border-line text-ivory transition-colors duration-300 hover:border-gold/50 hover:text-gold-light lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`fixed inset-0 z-[60] flex flex-col bg-[rgba(9,12,10,0.97)] backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-[5.5rem] items-center justify-between px-6 sm:px-10">
          <Wordmark />
          <button
            type="button"
            onClick={close}
            aria-label="Fechar menu"
            className="flex h-11 w-11 items-center justify-center border border-line text-ivory transition-colors duration-300 hover:border-gold/50 hover:text-gold-light"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Navegação móvel" className="flex flex-1 flex-col justify-center px-10">
          <ul className="space-y-2">
            {LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`transition-[opacity,transform] duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${140 + i * 80}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={close}
                  className="font-display group flex items-baseline gap-5 py-3 text-4xl font-light text-ivory transition-colors duration-300 hover:text-gold-light"
                >
                  <span className="text-xs tracking-[0.3em] text-gold/60" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`px-10 pb-12 transition-[opacity,transform] duration-700 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? "560ms" : "0ms" }}
        >
          <a href="#reservas" onClick={close} className="btn-gold w-full">
            <span>Reservar Mesa</span>
          </a>
          <p className="mt-6 text-center text-[0.6rem] tracking-[0.4em] text-sand uppercase">
            Mar · Ofício · Elegância
          </p>
        </div>
      </div>
    </>
  );
}
