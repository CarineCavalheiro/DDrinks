/**
 * Calculadora de Pacotes para DDrinks (Backend)
 * Calcula os valores dos pacotes Bronze, Prata e Ouro
 */

// Definição dos pacotes com seus multiplicadores
const PACKAGES = {
  BRONZE: {
    name: 'Bronze',
    multiplier: 1.0,
    color: '#8B4513',
    description: 'Pacote básico com seleção de drinks'
  },
  PRATA: {
    name: 'Prata',
    multiplier: 1.5,
    color: '#C0C0C0',
    description: 'Pacote intermediário com mais opções'
  },
  OURO: {
    name: 'Ouro',
    multiplier: 2.0,
    color: '#FFD700',
    description: 'Pacote premium com todas as opções'
  }
};

/**
 * Calcula o valor base por pessoa
 */
export function calculateBaseValue(quantidade, valorPorPessoa = 50) {
  return quantidade * valorPorPessoa;
}

/**
 * Calcula o valor dos drinks selecionados
 */
export function calculateDrinksValue(drinks = []) {
  if (!Array.isArray(drinks)) {
    return 0;
  }

  return drinks.reduce((total, drink) => {
    const preco = parseFloat(drink.preco) || 0;
    const quantidade = parseInt(drink.quantidade) || 1;
    return total + (preco * quantidade);
  }, 0);
}

/**
 * Calcula o valor de um pacote específico
 */
export function calculatePackageValue(baseValue, drinksValue, packageType = 'BRONZE', taxaServico = 0) {
  const pkg = PACKAGES[packageType];
  if (!pkg) {
    throw new Error(`Pacote inválido: ${packageType}`);
  }

  const subtotal = (baseValue + drinksValue) * pkg.multiplier;
  const taxa = subtotal * (taxaServico / 100);
  return subtotal + taxa;
}

/**
 * Calcula todos os três pacotes
 */
export function calculateAllPackages(quantidade, drinks = [], valorPorPessoa = 50, taxaServico = 0) {
  // Validação
  if (!quantidade || quantidade < 1) {
    throw new Error('Quantidade deve ser maior que 0');
  }

  const baseValue = calculateBaseValue(quantidade, valorPorPessoa);
  const drinksValue = calculateDrinksValue(drinks);

  return {
    baseValue,
    drinksValue,
    subtotal: baseValue + drinksValue,
    packages: {
      bronze: {
        name: PACKAGES.BRONZE.name,
        color: PACKAGES.BRONZE.color,
        multiplier: PACKAGES.BRONZE.multiplier,
        subtotal: (baseValue + drinksValue) * PACKAGES.BRONZE.multiplier,
        taxa: ((baseValue + drinksValue) * PACKAGES.BRONZE.multiplier) * (taxaServico / 100),
        total: calculatePackageValue(baseValue, drinksValue, 'BRONZE', taxaServico)
      },
      prata: {
        name: PACKAGES.PRATA.name,
        color: PACKAGES.PRATA.color,
        multiplier: PACKAGES.PRATA.multiplier,
        subtotal: (baseValue + drinksValue) * PACKAGES.PRATA.multiplier,
        taxa: ((baseValue + drinksValue) * PACKAGES.PRATA.multiplier) * (taxaServico / 100),
        total: calculatePackageValue(baseValue, drinksValue, 'PRATA', taxaServico)
      },
      ouro: {
        name: PACKAGES.OURO.name,
        color: PACKAGES.OURO.color,
        multiplier: PACKAGES.OURO.multiplier,
        subtotal: (baseValue + drinksValue) * PACKAGES.OURO.multiplier,
        taxa: ((baseValue + drinksValue) * PACKAGES.OURO.multiplier) * (taxaServico / 100),
        total: calculatePackageValue(baseValue, drinksValue, 'OURO', taxaServico)
      }
    },
    taxaServico
  };
}

/**
 * Formata valor em moeda brasileira
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Retorna informações sobre um pacote
 */
export function getPackageInfo(packageType) {
  return PACKAGES[packageType] || null;
}

/**
 * Retorna todos os pacotes disponíveis
 */
export function getAllPackages() {
  return PACKAGES;
}

/**
 * Valida dados de entrada
 */
export function validateInput(quantidade, drinks = []) {
  const errors = [];

  if (!quantidade || quantidade < 1) {
    errors.push('Quantidade de convidados deve ser maior que 0');
  }

  if (!Array.isArray(drinks)) {
    errors.push('Drinks deve ser um array');
  }

  if (drinks.length === 0) {
    errors.push('Selecione pelo menos um drink');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Gera um resumo dos pacotes para exibição
 */
export function generatePackageSummary(calculationResult) {
  const { baseValue, drinksValue, packages } = calculationResult;

  let summary = `
RESUMO DE ORÇAMENTO
==================

Valor Base (por pessoa): ${formatCurrency(baseValue)}
Valor Drinks: ${formatCurrency(drinksValue)}
Subtotal: ${formatCurrency(baseValue + drinksValue)}

PACOTES:
--------
Bronze: ${formatCurrency(packages.bronze.total)}
Prata: ${formatCurrency(packages.prata.total)}
Ouro: ${formatCurrency(packages.ouro.total)}
  `;

  return summary;
}

