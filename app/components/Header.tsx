import Link from "next/link";
import { FileText, Home, Lightbulb, Video, Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full py-4 px-6 sm:px-10 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    Currículo Fácil
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <Link href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        Início
                    </Link>
                    <Link href="#criar" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Criar Currículo
                    </Link>
                    <Link href="#dicas" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                        <Lightbulb className="h-4 w-4" />
                        Dicas
                    </Link>
                    <Link href="#videos" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        Vídeos
                    </Link>
                </nav>
                <button className="md:hidden focus:outline-none text-gray-700" aria-label="Menu">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
} 