import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Filosofia } from "@/components/site/filosofia";
import { Pratos } from "@/components/site/pratos";
import { Experiencia } from "@/components/site/experiencia";
import { Cardapio } from "@/components/site/cardapio";
import { Historia } from "@/components/site/historia";
import { Galeria } from "@/components/site/galeria";
import { Reservas } from "@/components/site/reservas";
import { Localizacao } from "@/components/site/localizacao";
import { Footer } from "@/components/site/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Filosofia />
        <Pratos />
        <Experiencia />
        <Cardapio />
        <Historia />
        <Galeria />
        <Reservas />
        <Localizacao />
      </main>
      <Footer />
    </>
  );
}
