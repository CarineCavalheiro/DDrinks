/**
 * Calculadora de Pacotes para DDrinks
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
 * @param {number} quantidade - Quantidade de convidados
 * @param {number} valorPorPessoa - Valor base por pessoa
 * @returns {number} Valor total base
 */
export function calculateBaseValue(quantidade, valorPorPessoa = 50) {
  return quantidade * valorPorPessoa;
}

/**
 * Calcula o valor dos drinks selecionados
 * @param {Array} drinks - Array de drinks com preço
 * @returns {number} Valor total dos drinks
 */
export function calculateDrinksValue(drinks = []) {
  return drinks.reduce((total, drink) => {
    return total + (drink.preco || 0) * (drink.quantidade || 1);
  }, 0);
}

/**
 * Calcula o valor de um pacote específico
 * @param {number} baseValue - Valor base
 * @param {number} drinksValue - Valor dos drinks
 * @param {string} packageType - Tipo de pacote (BRONZE, PRATA, OURO)
 * @param {number} taxaServico - Taxa de serviço (em %)
 * @returns {number} Valor total do pacote
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
 * @param {number} quantidade - Quantidade de convidados
 * @param {Array} drinks - Array de drinks selecionados
 * @param {number} valorPorPessoa - Valor base por pessoa
 * @param {number} taxaServico - Taxa de serviço (em %)
 * @returns {Object} Objeto com cálculo dos três pacotes
 */
export function calculateAllPackages(quantidade, drinks = [], valorPorPessoa = 50, taxaServico = 0) {
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
 * @param {number} value - Valor a formatar
 * @returns {string} Valor formatado em BRL
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Retorna informações sobre um pacote
 * @param {string} packageType - Tipo de pacote
 * @returns {Object} Informações do pacote
 */
export function getPackageInfo(packageType) {
  return PACKAGES[packageType] || null;
}

/**
 * Retorna todos os pacotes disponíveis
 * @returns {Object} Todos os pacotes
 */
export function getAllPackages() {
  return PACKAGES;
}

/**
 * Valida dados de entrada
 * @param {number} quantidade - Quantidade de convidados
 * @param {Array} drinks - Array de drinks
 * @returns {Object} Objeto com validação e erros
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
 * @param {Object} calculationResult - Resultado de calculateAllPackages
 * @returns {string} Resumo formatado
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

