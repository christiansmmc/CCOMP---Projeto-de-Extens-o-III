import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10 px-6 sm:px-10 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-xl font-bold text-blue-600">Currículo Fácil</h2>
                    <p className="text-gray-600 mt-2">
                        Facilitando sua entrada no mercado de trabalho.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Início</a></li>
                            <li><a href="#dicas" className="text-gray-600 hover:text-blue-600 transition-colors">Dicas</a></li>
                            <li><a href="/create" className="text-gray-600 hover:text-blue-600 transition-colors">Criar Currículo</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Recursos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tutorial em Vídeo</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contato</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4 w-full max-w-3xl">
                        <p className="text-blue-800 font-medium mb-1">
                            Projeto de Extensão Universitária
                        </p>
                        <p className="text-gray-700 text-sm">
                            Este projeto foi desenvolvido como parte de um Programa de Extensão Universitária,
                            contribuindo para a aplicação prática do conhecimento acadêmico e para o desenvolvimento social.
                        </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                        Desenvolvido por Christian Sequeira
                    </p>
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Currículo Fácil. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
} 