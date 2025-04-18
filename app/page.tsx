import Header from './components/Header';
import Hero from './components/Hero';
import CriarCurriculo from './components/CriarCurriculo';
import Dicas from './components/Dicas';
import Videos from './components/Videos';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CriarCurriculo />
        <Dicas />
        <Videos />
      </main>
      <Footer />
    </div>
  );
}
