import { User, Target, Briefcase, GraduationCap, Star, MessageSquare } from "lucide-react";

export default function Dicas() {
    const dicasList = [
        {
            id: 1,
            titulo: "Informações Pessoais",
            descricao: "Inclua nome completo, telefone e email profissional. Evite informações desnecessárias como estado civil ou idade.",
            icone: <User className="w-10 h-10 text-blue-500" />
        },
        {
            id: 2,
            titulo: "Objetivos Claros",
            descricao: "Descreva brevemente o cargo que busca e suas principais qualificações para a função.",
            icone: <Target className="w-10 h-10 text-blue-500" />
        },
        {
            id: 3,
            titulo: "Experiência Profissional",
            descricao: "Liste seus trabalhos anteriores em ordem cronológica inversa, incluindo cargo, empresa e período.",
            icone: <Briefcase className="w-10 h-10 text-blue-500" />
        },
        {
            id: 4,
            titulo: "Formação Acadêmica",
            descricao: "Inclua seus estudos mais relevantes, mesmo que incompletos ou em andamento. Mencione cursos técnicos e profissionalizantes.",
            icone: <GraduationCap className="w-10 h-10 text-blue-500" />
        },
        {
            id: 5,
            titulo: "Habilidades Específicas",
            descricao: "Mencione conhecimentos técnicos (idiomas, informática, etc) e habilidades interpessoais relevantes para a vaga.",
            icone: <Star className="w-10 h-10 text-blue-500" />
        },
        {
            id: 6,
            titulo: "Apresentação na Entrevista",
            descricao: "Vista-se adequadamente, chegue no horário e mantenha contato visual. Prepare-se para falar sobre suas experiências e habilidades.",
            icone: <MessageSquare className="w-10 h-10 text-blue-500" />
        }
    ];

    return (
        <section id="dicas" className="py-16 px-6 sm:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Dicas para o Mercado de Trabalho</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Orientações simples e práticas para ajudar você a criar um currículo eficiente e se preparar para o mercado de trabalho.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dicasList.map((dica) => (
                        <div key={dica.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform hover:scale-105 hover:shadow-md">
                            <div className="text-blue-500 mb-4">
                                {dica.icone}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{dica.titulo}</h3>
                            <p className="text-gray-600">{dica.descricao}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 