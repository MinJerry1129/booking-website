import { notFound } from "next/navigation";
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

export default async function ApartmentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
      {/* Header with back button */}
      <div className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para Imóveis
            </Link>
            <div className="text-sm text-blue-200">
              Detalhes do Imóvel
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Image Section */}
          <div className="space-y-4">
            {apartment.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={apartment.thumbnail} alt={apartment.title} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
            
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Quartos</div>
                <div className="text-2xl font-bold text-blue-900">{apartment.bedrooms}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Banheiros</div>
                <div className="text-2xl font-bold text-blue-900">{apartment.bathrooms}</div>
              </div>
            </div>
          </div>
          
          {/* Details Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isUnderConstruction ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                {statusLabel}
              </span>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{apartment.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{apartment.location}</span>
              </div>
              <p className="text-gray-600 text-lg mb-6">{`${apartment.size} m²`}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Preço</div>
              <div className="text-4xl font-bold text-blue-900">
                {typeof apartment.price === "number" ? `R$ ${apartment.price.toLocaleString('pt-BR')}` : `R$ ${apartment.price}`}
              </div>
            </div>
            
            {apartment.description && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{apartment.description}</p>
              </div>
            )}
            
            {apartment.contactNumber && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Entre em Contato</h3>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xl font-semibold text-blue-900">{apartment.contactNumber}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

