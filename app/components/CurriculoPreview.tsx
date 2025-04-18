'use client';

import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type Formacao = {
    curso?: string;
    instituicao?: string;
    anoConclusao?: string;
};

type Experiencia = {
    empresa?: string;
    cargo?: string;
    periodo?: string;
    descricaoAtividades?: string;
};

type Habilidade = {
    nome: string;
};

type CurriculoData = {
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
    objetivo: string;
    formacoes: Formacao[];
    experiencias: Experiencia[];
    habilidades: Habilidade[];
};

type CurriculoPreviewProps = {
    data: CurriculoData;
    onVoltar: () => void;
};

export default function CurriculoPreview({ data, onVoltar }: CurriculoPreviewProps) {
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (pdfRef.current) {
            // Mostrar mensagem de loading
            const originalContent = document.body.innerHTML;
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '0';
            loadingDiv.style.left = '0';
            loadingDiv.style.width = '100%';
            loadingDiv.style.height = '100%';
            loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            loadingDiv.style.display = 'flex';
            loadingDiv.style.justifyContent = 'center';
            loadingDiv.style.alignItems = 'center';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.innerHTML = '<div style="background: white; padding: 20px; border-radius: 8px;">Gerando PDF...</div>';
            document.body.appendChild(loadingDiv);

            try {
                // Gerar imagem do currículo usando html2canvas
                const canvas = await html2canvas(pdfRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                // Criar documento PDF no formato A4
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                // Dimensões A4 em mm
                const pdfWidth = 210;
                const pdfHeight = 297;

                // Calcular a largura e altura da imagem mantendo a proporção
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Adicionar a imagem ao PDF
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                // Se a altura da imagem for maior que a página A4, adicionar mais páginas
                if (imgHeight > pdfHeight) {
                    let heightLeft = imgHeight - pdfHeight;
                    let position = -pdfHeight;

                    while (heightLeft > 0) {
                        position = position - pdfHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pdfHeight;
                    }
                }

                // Salvar o PDF
                pdf.save(`curriculo-${data.nome.toLowerCase().replace(/\s+/g, '-')}.pdf`);
            } catch (error) {
                console.error('Erro ao gerar PDF:', error);
                alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
            } finally {
                // Remover mensagem de loading
                document.body.removeChild(loadingDiv);
            }
        }
    };

    // Verifica se há alguma formação válida
    const hasFormacao = data.formacoes.some(f =>
        f.curso || f.instituicao || f.anoConclusao
    );

    // Verifica se há alguma experiência válida
    const hasExperiencia = data.experiencias.some(e =>
        e.empresa || e.cargo || e.periodo || e.descricaoAtividades
    );

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onVoltar}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                >
                    Voltar e Editar
                </button>

                <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Baixar PDF
                </button>
            </div>

            {/* Visualização do currículo (será transformado em PDF) */}
            <div
                ref={pdfRef}
                className="bg-white shadow-md rounded-lg p-8 max-w-[800px] mx-auto"
                style={{
                    minHeight: '1123px',
                    width: '100%',
                    color: '#333333',
                    backgroundColor: '#ffffff'
                }}
            >
                <div style={{ borderBottom: '2px solid #333333', paddingBottom: '24px', marginBottom: '24px' }}>
                    <h1
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginBottom: '4px',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            color: '#333333'
                        }}
                    >
                        {data.nome}
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ color: '#555555' }}>{data.cidade}</span>
                            <span style={{ color: '#999999' }}>•</span>
                            <span style={{ color: '#555555' }}>{data.telefone}</span>
                            <span style={{ color: '#999999' }}>•</span>
                            <span style={{ color: '#555555' }}>{data.email}</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        borderBottom: '1px solid #cccccc',
                        paddingBottom: '4px',
                        color: '#333333'
                    }}>
                        OBJETIVO PROFISSIONAL
                    </h2>
                    <p style={{ color: '#555555' }}>{data.objetivo}</p>
                </div>

                {hasFormacao && (
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            borderBottom: '1px solid #cccccc',
                            paddingBottom: '4px',
                            color: '#333333'
                        }}>
                            FORMAÇÃO ACADÊMICA
                        </h2>

                        {data.formacoes.map((formacao, index) => {
                            // Pula formações vazias
                            if (!formacao.curso && !formacao.instituicao && !formacao.anoConclusao) {
                                return null;
                            }

                            return (
                                <div key={index} style={{ marginBottom: index < data.formacoes.length - 1 ? '16px' : '0' }}>
                                    {formacao.curso && <p style={{ fontWeight: '500', color: '#333333' }}>{formacao.curso}</p>}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        {formacao.instituicao && <p style={{ color: '#555555' }}>{formacao.instituicao}</p>}
                                        {formacao.anoConclusao && <p style={{ color: '#555555' }}>{formacao.anoConclusao}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {hasExperiencia && (
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            borderBottom: '1px solid #cccccc',
                            paddingBottom: '4px',
                            color: '#333333'
                        }}>
                            EXPERIÊNCIA PROFISSIONAL
                        </h2>

                        {data.experiencias.map((experiencia, index) => {
                            // Pula experiências vazias
                            if (!experiencia.empresa && !experiencia.cargo && !experiencia.periodo && !experiencia.descricaoAtividades) {
                                return null;
                            }

                            return (
                                <div key={index} style={{ marginBottom: index < data.experiencias.length - 1 ? '20px' : '0' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '4px'
                                    }}>
                                        {experiencia.empresa && <p style={{ fontWeight: '500', color: '#333333' }}>{experiencia.empresa}</p>}
                                        {experiencia.periodo && <p style={{ fontSize: '14px', color: '#555555' }}>{experiencia.periodo}</p>}
                                    </div>
                                    {experiencia.cargo && <p style={{ fontStyle: 'italic', marginBottom: '8px', color: '#444444' }}>{experiencia.cargo}</p>}
                                    {experiencia.descricaoAtividades && <p style={{ color: '#555555' }}>{experiencia.descricaoAtividades}</p>}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        borderBottom: '1px solid #cccccc',
                        paddingBottom: '4px',
                        color: '#333333'
                    }}>
                        HABILIDADES
                    </h2>
                    <div>
                        {data.habilidades.map((habilidade, index) => (
                            <span
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    fontSize: '14px',
                                    fontWeight: 'normal',
                                    marginRight: '8px',
                                    marginBottom: '8px',
                                    borderRadius: '16px',
                                    backgroundColor: '#f3f4f6',
                                    color: '#333333',
                                    border: '1px solid #e5e7eb'
                                }}
                            >
                                {habilidade.nome}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 