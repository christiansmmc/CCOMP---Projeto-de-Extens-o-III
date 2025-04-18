'use client';

import dynamic from 'next/dynamic';

// Importar o componente com carregamento dinâmico para evitar problemas de SSR
const CurriculoForm = dynamic(() => import('./CurriculoForm'), {
    ssr: false,
});

export default function ClientCurriculoForm() {
    return <CurriculoForm />;
} 