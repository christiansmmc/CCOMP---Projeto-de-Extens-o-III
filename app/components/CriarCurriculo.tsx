import ClientCurriculoForm from './ClientCurriculoForm';

export default function CriarCurriculo() {
    return (
        <section id="criar" className="py-16 px-6 sm:px-10 bg-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Crie seu Currículo</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Preencha o formulário abaixo com suas informações para criar um currículo profissional gratuitamente.
                    </p>
                </div>

                <ClientCurriculoForm />
            </div>
        </section>
    );
} 