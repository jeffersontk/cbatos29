    // Função para formatar o número de telefone
    export const formatPhoneNumber = (value: string) => {
        // Remove todos os caracteres não numéricos
        const cleaned = value.replace(/\D/g, '');
        // Verifica se o número tem 11 dígitos (formato com DDD)
        const hasAreaCode = cleaned.length > 10;
        // Formatação com base no formato do número
        if (hasAreaCode) {
            const areaCode = cleaned.slice(0, 2);
            const firstPart = cleaned.slice(2, 7);
            const secondPart = cleaned.slice(7);
            return `(${areaCode}) ${firstPart} ${secondPart}`;
        } else {
            const firstPart = cleaned.slice(0, 5);
            const secondPart = cleaned.slice(5);
            return `${firstPart} ${secondPart}`;
        }
    };