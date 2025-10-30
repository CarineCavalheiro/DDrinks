function calcularOrcamento(fatorPreco = 1) {
    const precosBase = {
        "caipirinha": 10,
        "mojito": 3,
        "sex_on_the_beach": 8,
        "gin_tonica": 6,
        "moscow_mule": 5,
        "gim_tropical": 6,
        "negroni": 10,
        "aperol_spritz": 13,
        "whisky_sour": 6,
        "cosmopolitan": 6,
        "caipirinha_morango": 8,
        "caipirinha_limao": 4,
        "pina_colada": 6,
        "alexander": 13,
        "tequila_sour": 17,
        "pink_lady": 15
    };

    let totalDrinks = 0;
    let detalhesDrinks = "";

    for (let drink in precosBase) {
        const quantidade = parseInt(document.getElementById(drink)?.value) || 0;

        if (quantidade > 0) {
            const precoUnitario = precosBase[drink] * fatorPreco;
            const subtotal = precoUnitario * quantidade;
            totalDrinks += subtotal;

            const nomeFormatado = drink.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            detalhesDrinks += `${nomeFormatado}: ${quantidade} x R$ ${precoUnitario.toFixed(2)} = R$ ${subtotal.toFixed(2)}<br>`;
        }
    }

    // Calcular outros gastos
    const outrosGastosIds = [
        { id: "gelo", nome: "Gelo" },
        { id: "copos", nome: "Copos" },
        { id: "decoracao", nome: "Decoração" },
        { id: "carretinha", nome: "Aluguel Carretinha" },
        { id: "flores", nome: "Flores Comestíveis" },
        { id: "papelaria", nome: "Papelaria" },
        { id: "funcionarios", nome: "Funcionários" },
        { id: "alimentacao", nome: "Alimentação" },
        { id: "canudos", nome: "Canudos" },
        { id: "gasolina", nome: "Gasolina" }
    ];

    let totalOutros = 0;
    let detalhesOutros = "";

    outrosGastosIds.forEach(item => {
        const valor = parseFloat(document.getElementById(item.id)?.value) || 0;
        if (valor > 0) {
            totalOutros += valor;
            detalhesOutros += `${item.nome}: R$ ${valor.toFixed(2)}<br>`;
        }
    });

    const totalGeral = totalDrinks + totalOutros;

    if (totalDrinks === 0 && totalOutros === 0) {
        document.getElementById('resultado').innerHTML = `<strong>Por favor, informe a quantidade de pelo menos um drink ou um gasto adicional.</strong>`;
        return;
    }

    document.getElementById('resultado').innerHTML = `
        <h3>Resumo do Orçamento:</h3>
        ${detalhesDrinks}
        ${detalhesOutros ? `<h4>Outros Gastos:</h4>${detalhesOutros}` : ""}
        <strong>Total Geral: R$ ${totalGeral.toFixed(2)}</strong>
    `;
}
