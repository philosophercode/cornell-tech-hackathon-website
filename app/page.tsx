import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Schedule } from "@/components/schedule";
import { Sponsors } from "@/components/sponsors";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Schedule />
        <div className="section-divider" />
        <Sponsors />
        <div className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
