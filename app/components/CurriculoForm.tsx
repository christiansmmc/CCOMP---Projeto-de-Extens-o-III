'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CurriculoPreview from './CurriculoPreview';

// Esquema para formação acadêmica
const formacaoSchema = z.object({
    curso: z.string().optional(),
    instituicao: z.string().optional(),
    anoConclusao: z.string().optional(),
});

// Esquema para experiência profissional
const experienciaSchema = z.object({
    empresa: z.string().optional(),
    cargo: z.string().optional(),
    periodo: z.string().optional(),
    descricaoAtividades: z.string().optional(),
});

// Esquema para habilidades
const habilidadeSchema = z.object({
    nome: z.string().min(1, 'Habilidade não pode ser vazia'),
});

// Definindo o esquema de validação do currículo completo
const curriculoSchema = z.object({
    // Informações Pessoais
    nome: z.string().min(3, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(8, 'Telefone deve ter pelo menos 8 dígitos'),
    cidade: z.string().min(2, 'Cidade é obrigatória'),

    // Objetivo
    objetivo: z.string().min(10, 'Descreva seu objetivo profissional'),

    // Arrays de formações, experiências e habilidades
    formacoes: z.array(formacaoSchema),
    experiencias: z.array(experienciaSchema),
    habilidades: z.array(habilidadeSchema).min(1, 'Adicione pelo menos uma habilidade'),
});

type CurriculoData = z.infer<typeof curriculoSchema>;

export default function CurriculoForm() {
    const [showPreview, setShowPreview] = useState(false);
    const [curriculoData, setCurriculoData] = useState<CurriculoData | null>(null);

    const { register, handleSubmit, control, formState: { errors } } = useForm<CurriculoData>({
        resolver: zodResolver(curriculoSchema),
        defaultValues: {
            nome: '',
            email: '',
            telefone: '',
            cidade: '',
            objetivo: '',
            formacoes: [{ curso: '', instituicao: '', anoConclusao: '' }],
            experiencias: [{ empresa: '', cargo: '', periodo: '', descricaoAtividades: '' }],
            habilidades: [{ nome: '' }],
        }
    });

    // UseFieldArray para gerenciar os arrays de formações
    const {
        fields: formacoesFields,
        append: appendFormacao,
        remove: removeFormacao
    } = useFieldArray({
        control,
        name: 'formacoes',
    });

    // UseFieldArray para gerenciar os arrays de experiências
    const {
        fields: experienciasFields,
        append: appendExperiencia,
        remove: removeExperiencia
    } = useFieldArray({
        control,
        name: 'experiencias',
    });

    // UseFieldArray para gerenciar os arrays de habilidades
    const {
        fields: habilidadesFields,
        append: appendHabilidade,
        remove: removeHabilidade
    } = useFieldArray({
        control,
        name: 'habilidades',
    });

    const onSubmit = (data: CurriculoData) => {
        setCurriculoData(data);
        setShowPreview(true);
    };

    const handleVoltar = () => {
        setShowPreview(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {showPreview && curriculoData ? (
                <CurriculoPreview data={curriculoData} onVoltar={handleVoltar} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6">
                    {/* Informações Pessoais */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                            Informações Pessoais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Completo *
                                </label>
                                <input
                                    id="nome"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Seu nome completo"
                                    {...register('nome')}
                                />
                                {errors.nome && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="seu.email@exemplo.com"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefone *
                                </label>
                                <input
                                    id="telefone"
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="(00) 00000-0000"
                                    {...register('telefone')}
                                />
                                {errors.telefone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                                    Cidade/Estado *
                                </label>
                                <input
                                    id="cidade"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Cidade - UF"
                                    {...register('cidade')}
                                />
                                {errors.cidade && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cidade.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Objetivo Profissional */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                            Objetivo Profissional
                        </h3>
                        <div>
                            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700 mb-1">
                                Descreva seu objetivo *
                            </label>
                            <textarea
                                id="objetivo"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                placeholder="Ex: Busco oportunidade como Assistente Administrativo para contribuir com minhas habilidades organizacionais..."
                                {...register('objetivo')}
                            ></textarea>
                            {errors.objetivo && (
                                <p className="mt-1 text-sm text-red-600">{errors.objetivo.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Formação Acadêmica */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Formação Acadêmica <span className="text-sm font-normal text-gray-500">(Opcional)</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => appendFormacao({ curso: '', instituicao: '', anoConclusao: '' })}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Adicionar
                            </button>
                        </div>

                        {formacoesFields.map((field, index) => (
                            <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-700">Formação {index + 1}</h4>
                                    {formacoesFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFormacao(index)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Curso/Formação
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Ex: Ensino Médio Completo"
                                            {...register(`formacoes.${index}.curso`)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Instituição
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Nome da escola ou instituição"
                                            {...register(`formacoes.${index}.instituicao`)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Conclusão (ou previsão)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Ex: 2022 ou Em andamento"
                                            {...register(`formacoes.${index}.anoConclusao`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Experiência Profissional */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Experiência Profissional <span className="text-sm font-normal text-gray-500">(Opcional)</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => appendExperiencia({ empresa: '', cargo: '', periodo: '', descricaoAtividades: '' })}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Adicionar
                            </button>
                        </div>

                        {experienciasFields.map((field, index) => (
                            <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-700">Experiência {index + 1}</h4>
                                    {experienciasFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeExperiencia(index)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Empresa
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Nome da empresa"
                                            {...register(`experiencias.${index}.empresa`)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cargo
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Seu cargo ou função"
                                            {...register(`experiencias.${index}.cargo`)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Período
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Ex: Jan/2020 - Dez/2021"
                                            {...register(`experiencias.${index}.periodo`)}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Descrição das Atividades
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                            placeholder="Descreva suas principais atividades e responsabilidades"
                                            {...register(`experiencias.${index}.descricaoAtividades`)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Habilidades */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Habilidades *
                            </h3>
                            <button
                                type="button"
                                onClick={() => appendHabilidade({ nome: '' })}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Adicionar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {habilidadesFields.map((field, index) => (
                                <div key={field.id} className="flex items-center">
                                    <input
                                        type="text"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                        placeholder="Ex: Comunicação"
                                        {...register(`habilidades.${index}.nome`)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (habilidadesFields.length > 1) {
                                                removeHabilidade(index);
                                            }
                                        }}
                                        disabled={habilidadesFields.length <= 1}
                                        className={`p-2 rounded-r-md ${habilidadesFields.length > 1
                                            ? 'bg-red-500 hover:bg-red-600 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {errors.habilidades && (
                            <p className="mt-1 text-sm text-red-600">Adicione pelo menos uma habilidade</p>
                        )}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Visualizar Currículo
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-gray-500 text-center">
                        * Campos obrigatórios
                    </p>
                </form>
            )}
        </div>
    );
} 