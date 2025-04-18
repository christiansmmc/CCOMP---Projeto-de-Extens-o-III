import Link from "next/link";
import { FileText, Lightbulb } from "lucide-react";

export default function Hero() {
    return (
        <section id="inicio" className="py-16 sm:py-20 px-6 sm:px-10 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Currículo Fácil e Acessível para <span className="text-blue-600">Todos</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Plataforma gratuita onde pessoas em situação de vulnerabilidade podem criar currículos profissionais,
                            receber dicas e orientações para o mercado de trabalho.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#criar"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors text-center"
                            >
                                <FileText className="h-5 w-5" />
                                Criar Currículo
                            </Link>
                            <Link
                                href="#dicas"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors text-center"
                            >
                                <Lightbulb className="h-5 w-5" />
                                Ver Dicas
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-16">
                        <div className="relative h-64 sm:h-80 rounded-lg bg-white shadow-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                            <svg className="w-32 h-32 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                                Modelo ilustrativo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 