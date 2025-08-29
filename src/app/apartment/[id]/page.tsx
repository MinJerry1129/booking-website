import { notFound } from "next/navigation";
import Link from "next/link";
import ContactModal from "./ContactModal";

type Apartment = {
  _id: string;
  title: string;
  price: string | number;
  bedrooms: string | number;
  bathrooms: string | number;
  size: string;
  location: string;
  status?: string;
  contactNumber?: string;
  description?: string;
  thumbnail?: string;
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case "under_construction":
      return "Em construção";
    case "available":
      return "Disponível";
    case "sold":
      return "Vendido";
    case "reserved":
      return "Reservado";
    default:
      return "Disponível";
  }
};

export default async function ApartmentDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5004";
  let apartment: Apartment | null = null;
  let error = null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/apartments/app/get/${id}`, { cache: "no-store" });
    if (res.ok) {
      apartment = await res.json();
    } else if (res.status === 404) {
      error = "Imóvel não encontrado";
    } else {
      error = `Erro ao carregar imóvel: ${res.status}`;
    }
  } catch (e) {
    error = "Erro de conexão. Verifique sua internet.";
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-blue-900 text-white py-4">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para Imóveis
            </Link>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h1 className="text-2xl font-bold text-red-800 mb-2">Erro ao Carregar Imóvel</h1>
              <p className="text-red-600 mb-6">{error}</p>
              <Link 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Voltar para Imóveis
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    notFound();
  }

  const statusLabel = getStatusLabel(apartment.status);
  const isUnderConstruction = apartment.status === "under_construction";

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar with back */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para Imóveis
            </Link>
            <div className="text-sm text-blue-200">Detalhes do Imóvel</div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative border-b">
        {apartment.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={apartment.thumbnail} alt={apartment.title} className="w-full h-[420px] md:h-[560px] object-cover" />
        ) : (
          <div className="w-full h-[420px] md:h-[560px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-6">
            <div className="flex flex-wrap items-end gap-4 justify-between">
              <div className="text-white">
                <h1 className="text-2xl md:text-4xl font-semibold drop-shadow">{apartment.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-blue-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm md:text-base">{apartment.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm md:text-base">{apartment.size} m²</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur bg-white/20 text-white border border-white/30`}>{statusLabel}</span>
                <div className="px-4 py-2 rounded-lg bg-white text-blue-900 text-xl md:text-2xl font-bold shadow">
                  {typeof apartment.price === "number" ? `R$ ${apartment.price.toLocaleString('pt-BR')}` : `R$ ${apartment.price}`}
                </div>
                <ContactModal apartmentTitle={apartment.title} apartmentId={apartment._id} contactNumber={apartment.contactNumber} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview section (like reference) */}
      <section className="border-b">
        <div className="mx-auto w-full md:w-[80%] px-4 py-8 grid md:grid-cols-3 gap-8 items-start">
          {/* Left: title, desc, badge, feature icons */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{apartment.title}</h1>
            <p className="mt-3 text-gray-700">A leveza e a sofisticação atemporal estão presentes em cada detalhe.</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm border">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg>
              179 pessoas viram este imóvel nos últimos 90 dias
            </div>

            {/* Feature row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 text-gray-800">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 7.75A2.75 2.75 0 0 1 4.75 5h6.5A2.75 2.75 0 0 1 14 7.75V9h5a3 3 0 0 1 3 3v5.25a.75.75 0 0 1-1.5 0V17H3v.25a.75.75 0 0 1-1.5 0V7.75Zm1.5 7.75H20.5V12a1.5 1.5 0 0 0-1.5-1.5H3.5V15.5ZM13 9V7.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25V9H13Z"/></svg>
                </span>
                <span>{String(apartment.bedrooms)} dormitórios</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/></svg>
                </span>
                <span>{apartment.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h10v2H4v-2z"/></svg>
                </span>
                <span>2 e 3 vagas</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10.25A2.25 2.25 0 0 1 5.25 8h7.5A2.25 2.25 0 0 1 15 10.25V12h3.25A2.75 2.75 0 0 1 21 14.75V18h.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H3V10.25Z"/></svg>
                </span>
                <span>{String(apartment.bathrooms)} banheiros</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 11h2v2H2v-2zm4 0h14v2H6v-2z"/></svg>
                </span>
                <span>125 a {apartment.size} m²</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 border">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>
                </span>
                <span>{String(apartment.bedrooms)} dormitórios</span>
              </div>
            </div>
          </div>

          {/* Right: price and actions */}
          <div className="md:col-span-1">
            <div className="text-gray-600 text-sm">Venda a partir de:</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              {typeof apartment.price === "number" ? `R$ ${apartment.price.toLocaleString('pt-BR')}` : `R$ ${apartment.price}`}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <ContactModal apartmentTitle={apartment.title} apartmentId={apartment._id} contactNumber={apartment.contactNumber} className="w-full justify-center" />
              <button type="button" className="w-full inline-flex justify-center items-center gap-2 border rounded-xl px-4 py-2 text-blue-700 border-blue-200 hover:bg-blue-50 font-medium">Agendar visita</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky summary nav */}
      <section className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="mx-auto w-full md:w-[80%] px-4">
          <nav className="flex gap-4 overflow-x-auto py-3 text-sm">
            {[
              { id: "projeto", label: "Projeto" },
              { id: "apartamentos", label: "Apartamentos" },
              { id: "plantas", label: "Plantas" },
              { id: "areas", label: "Quadro de Áreas" },
              { id: "diferenciais", label: "Diferenciais" },
              { id: "localizacao", label: "Localização" },
              { id: "contato", label: "Contato" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 rounded-full border border-transparent hover:border-blue-200 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Content sections */}
      <div className="mx-auto w-full md:w-[80%] px-4 py-10 space-y-16">
        {/* Projeto */}
        <section id="projeto" className="py-2">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Projeto</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Visão geral</span>
            </div>
            <div className="rounded-2xl overflow-hidden border bg-white shadow-sm mb-6">
              {apartment.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={apartment.thumbnail} alt={apartment.title} className="w-full h-full max-h-[460px] object-cover" />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-500">Sem imagem</div>
              )}
            </div>
            {apartment.description ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                {apartment.description}
              </p>
            ) : (
              <p className="text-gray-600">Detalhes do projeto serão disponibilizados em breve.</p>
            )}
          </div>
        </section>

        {/* Apartamentos (gallery) */}
        <section id="apartamentos">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Apartamentos</h2>
            <span className="text-sm text-gray-500">Galeria</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {apartment.thumbnail ? (
              [1,2,3].map((i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={apartment.thumbnail as string}
                  alt={`${apartment.title} imagem ${i}`}
                  className="aspect-[16/10] w-full object-cover rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                />
              ))
            ) : (
              [1,2,3].map((i) => (
                <div key={i} className="aspect-[16/10] rounded-xl bg-gray-100 border flex items-center justify-center text-gray-500">Sem imagem</div>
              ))
            )}
          </div>
        </section>

        {/* Plantas */}
        <section id="plantas">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Plantas</h2>
          <div className="rounded-xl border p-6 bg-white text-gray-600 shadow-sm">Imagens e variações das plantas em breve.</div>
        </section>

        {/* Quadro de Áreas */}
        <section id="areas">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quadro de Áreas</h2>
          <div className="overflow-x-auto border rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-2">Tipo</th>
                  <th className="text-left px-4 py-2">Dorms</th>
                  <th className="text-left px-4 py-2">Banheiros</th>
                  <th className="text-left px-4 py-2">Área</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t">
                  <td className="px-4 py-2">Padrão</td>
                  <td className="px-4 py-2">{apartment.bedrooms}</td>
                  <td className="px-4 py-2">{apartment.bathrooms}</td>
                  <td className="px-4 py-2">{apartment.size} m²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Diferenciais */}
        <section id="diferenciais">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Diferenciais</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Piscina","Academia","Área Gourmet","Coworking","Playground","Pet place","Segurança 24h","Bicicletário"].map((f) => (
              <div key={f} className="border rounded-xl p-4 text-center text-gray-700 bg-white shadow-sm hover:shadow-md transition">{f}</div>
            ))}
          </div>
        </section>

        {/* Localização */}
        <section id="localizacao">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Localização</h2>
          <div className="rounded-xl border p-6 bg-white text-gray-700 shadow-sm">
            Endereço: {apartment.location}
          </div>
        </section>

        {/* Contato moved to hero via ContactModal */}

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Perguntas frequentes</h2>
          <div className="divide-y border rounded-xl bg-white shadow-sm">
            {[
              { q: "Qual o status da obra?", a: statusLabel },
              { q: "Qual a metragem do imóvel?", a: `${apartment.size} m²` },
              { q: "Quantos quartos e banheiros?", a: `${apartment.bedrooms} quartos, ${apartment.bathrooms} banheiros` },
            ].map((item, idx) => (
              <details key={idx} className="group p-4">
                <summary className="cursor-pointer font-medium text-gray-900 flex items-center justify-between">
                  {item.q}
                  <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                </summary>
                <p className="mt-2 text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

