import Image from "next/image";
import { FaSearch, FaUser, FaBell, FaHeart, FaBed, FaBath, FaMapMarkerAlt, FaBuilding, FaCalendar, FaFileAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

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


export default async function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5004";
  let apartments: Apartment[] = [];
  let isLoading = false;
  let error = null;
  
  try {
    isLoading = true;
    const res = await fetch(`${API_BASE_URL}/api/apartments/app/get`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      apartments = data?.apartments ?? [];
    } else {
      error = `Erro ao carregar imóveis: ${res.status}`;
    }
  } catch (e) {
    error = "Erro de conexão. Verifique sua internet.";
  } finally {
    isLoading = false;
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full bg-white p-1" />
              <span className="text-xl font-semibold">Vanessa Zaniolo</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-200 transition-colors">Home</a>              
              <a href="#" className="hover:text-blue-200 transition-colors">Valores</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Contato</a>
            </nav>
            <div className="flex items-center space-x-4">
              <FaSearch className="cursor-pointer hover:text-blue-200" />
              <FaUser className="cursor-pointer hover:text-blue-200" />
              <FaBell className="cursor-pointer hover:text-blue-200" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Descubra os Melhores Lançamentos imobiliário em Curitiba
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Encontre o apartamento dos seus sonhos com as melhores condições e localização privilegiada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Buscar imóvel..."
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <FaSearch />
                  Buscar Imóvel
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full border-2 border-blue-600 overflow-hidden relative">
                <Image src="/myhero.png" alt="Imagem destaque" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre a GT. Building</h2>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              A GT. Building é uma empresa especializada em incorporação, com foco em projetos residenciais de qualidade. 
              Nosso último projeto, "Trio Pinheirinho", foi entregue em novembro de 2024, demonstrando nosso compromisso 
              com a excelência e pontualidade na entrega.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-blue-600 text-2xl" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">14</div>
              <div className="text-gray-600">PROJETOS NO APTO</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendar className="text-blue-600 text-2xl" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">6</div>
              <div className="text-gray-600">ANOS DE HISTÓRIA</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">PR</div>
              <div className="text-gray-600">SEDE</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="text-blue-600 text-2xl" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">81</div>
              <div className="text-gray-600">PUBLICAÇÕES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Principais regiões da GT. Building</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Cities */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Cidades</h3>
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold mb-2">Curitiba</div>
                <div className="text-blue-100">12 bairros ativos</div>
              </div>
            </div>

            {/* Neighborhoods */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Bairros</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-semibold">Batel</div>
                  <div className="text-gray-600">3 imóveis</div>
                  <div className="text-sm text-gray-500">Curitiba, Paraná</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-semibold">Champagnat</div>
                  <div className="text-gray-600">2 imóveis</div>
                  <div className="text-sm text-gray-500">Curitiba, Paraná</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-semibold">Bigorrilho</div>
                  <div className="text-gray-600">4 imóveis</div>
                  <div className="text-sm text-gray-500">Curitiba, Paraná</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-semibold">Cabral</div>
                  <div className="text-gray-600">2 imóveis</div>
                  <div className="text-sm text-gray-500">Curitiba, Paraná</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors">
              VEJA REPRESENTA ESSA EMPRESA
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Imóveis da GT. Building</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Carregando imóveis...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-800 font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}
          
          {/* Properties Grid */}
          {!isLoading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {apartments.map((apartment) => {
                const statusLabel = getStatusLabel(apartment.status);
                const isUnderConstruction = apartment.status === "under_construction";
                return (
                  <Link key={apartment._id} href={`/apartment/${apartment._id}`} className="block">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                      <div className="relative">
                        {apartment.thumbnail ? (
                          <img src={apartment.thumbnail} alt={apartment.title} className="w-full h-48 object-cover" />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Imagem do Imóvel</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 group">
                          <FaHeart 
                            className="text-red-500 cursor-default group-hover:text-red-600 transition-colors" 
                          />
                          <div className="absolute right-0 top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Adicionar aos favoritos
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${isUnderConstruction ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                            {statusLabel}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">{apartment.title}</h3>
                        <p className="text-gray-600 mb-4">{apartment.location}</p>
                        <p className="text-gray-600 mb-4">{`${apartment.size} m²`}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <FaBed className="text-gray-500" />
                            <span className="text-gray-600">{apartment.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaBath className="text-gray-500" />
                            <span className="text-gray-600">{apartment.bathrooms}</span>
                          </div>
                        </div>
                        
                        <div className="text-2xl font-bold text-blue-900 mb-4">{typeof apartment.price === "number" ? `R$ ${apartment.price.toLocaleString('pt-BR')}` : `R$ ${apartment.price}`}</div>
                        
                        <div className="text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                          Ver Detalhes
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {apartments.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-xl text-gray-600 mb-2">Nenhum imóvel encontrado</p>
                  <p className="text-gray-500">Tente novamente mais tarde ou entre em contato conosco.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full bg-white p-1" />
                <span className="text-xl font-semibold">VZ Vanessa Zaniolo</span>
              </div>
              <p className="text-blue-100 mb-6">
                Encontre o imóvel dos seus sonhos com as melhores condições e atendimento personalizado.
              </p>
              <div className="flex space-x-4">
                <FaFacebook className="text-2xl cursor-pointer hover:text-blue-200" />
                <FaInstagram className="text-2xl cursor-pointer hover:text-blue-200" />
                <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-200" />
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-200" />
              </div>
            </div>

            {/* Properties */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Imóveis</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200 transition-colors">Apartamentos</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Lançamentos</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Comerciais</a></li>
              </ul>
            </div>

            {/* Regions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Regiões</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-200 transition-colors">Batel</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Champagnat</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Bigorrilho</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Cabral</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>(41) 99999-9999</li>
                <li>contato@vanessazaniolo.com</li>
                <li>Curitiba, PR</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p className="text-blue-100">© 2025 Vanessa Zaniolo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
