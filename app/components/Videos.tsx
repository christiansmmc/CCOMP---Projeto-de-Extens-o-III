export default function Videos() {
    const videosList = [
        {
            id: 1,
            titulo: "CURRÍCULO PRIMEIRO EMPREGO: O QUE COLOCAR QUANDO VOCÊ AINDA NÃO TEM EXPERIÊNCIA?",
            descricao: "Aprenda estratégias para destacar suas habilidades, competências e formação em um currículo sem experiência profissional prévia.",
            url: "https://www.youtube.com/watch?v=cHFqdmmv2Is",
            thumbnail: "https://img.youtube.com/vi/cHFqdmmv2Is/maxresdefault.jpg"
        },
        {
            id: 2,
            titulo: "CURRÍCULO SEM EXPERIENCIA - Aula Prática",
            descricao: "Tutorial passo a passo para criar um currículo eficiente para quem está em busca do primeiro emprego, com exemplos reais e dicas práticas.",
            url: "https://www.youtube.com/watch?v=wW2mcaTHYNQ",
            thumbnail: "https://img.youtube.com/vi/wW2mcaTHYNQ/maxresdefault.jpg"
        },
        {
            id: 3,
            titulo: "CURRÍCULO PRIMEIRO EMPREGO: TUDO O QUE PRECISA SABER (Jovem Aprendiz, Estágio e muito mais!)",
            descricao: "Guia completo sobre como montar um currículo para programas de Jovem Aprendiz, estágios e primeiras oportunidades no mercado de trabalho.",
            url: "https://www.youtube.com/watch?v=vcmLdHUcYkg",
            thumbnail: "https://img.youtube.com/vi/vcmLdHUcYkg/maxresdefault.jpg"
        }
    ];

    return (
        <section id="videos" className="py-16 px-6 sm:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Vídeos de Orientação Profissional</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Assista a vídeos com dicas e orientações de especialistas para ajudar na sua jornada profissional.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videosList.map((video) => (
                        <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform hover:scale-105 hover:shadow-md">
                            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={`Thumbnail do vídeo: ${video.titulo}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{video.titulo}</h3>
                                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{video.descricao}</p>
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:underline"
                                >
                                    <span>Assistir vídeo</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 italic">
                        Mais vídeos de orientação serão adicionados em breve!
                    </p>
                </div>
            </div>
        </section>
    );
} 