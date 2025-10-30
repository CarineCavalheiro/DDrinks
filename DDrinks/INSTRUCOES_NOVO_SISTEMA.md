# 🍹 DDrinks - Sistema Multi-Pacotes

## Instruções de Uso do Novo Sistema

Bem-vindo ao novo sistema de orçamentos DDrinks com suporte a **3 pacotes simultâneos**: Bronze, Prata e Ouro!

### 📋 Como Funciona

O novo sistema permite que você crie um único orçamento que calcula automaticamente os valores para os três pacotes diferentes. Você seleciona os drinks uma única vez, e o sistema calcula todos os pacotes com base em multiplicadores predefinidos.

#### Multiplicadores dos Pacotes:
- **Bronze**: 1.0x (valor base)
- **Prata**: 1.5x (50% mais caro)
- **Ouro**: 2.0x (100% mais caro - o dobro)

### 🚀 Passo a Passo

#### 1. Acessar o Sistema

```
http://localhost:3000/orcamento-novo
```

#### 2. Preencher Dados do Evento

Na seção **"Dados do Evento"**, preencha:
- **Nome do Cliente**: Nome da pessoa que está contratando
- **Telefone**: Contato do cliente
- **Cidade**: Local do evento
- **Data do Evento**: Quando será o evento (data futura)
- **Quantidade de Convidados**: Número de pessoas
- **Descrição do Evento**: Tipo de evento (aniversário, casamento, etc.)
- **Taxa de Serviço (%)**: Percentual opcional (ex: 10%)

#### 3. Selecionar Drinks

Na seção **"Seleção de Drinks"**:
1. Clique em "Carregar Drinks" para ver a lista disponível
2. Marque os drinks que deseja incluir no orçamento
3. Ajuste a quantidade de cada drink se necessário

#### 4. Visualizar Cálculo em Tempo Real

Conforme você seleciona drinks e preenche os dados, o sistema calcula automaticamente:
- **Valor Base**: Quantidade de convidados × R$ 50 (valor padrão por pessoa)
- **Valor Drinks**: Soma de todos os drinks selecionados
- **Subtotal**: Valor base + valor drinks
- **Taxa de Serviço**: Percentual aplicado ao subtotal
- **Valores dos Pacotes**: Bronze, Prata e Ouro com seus multiplicadores

#### 5. Gerar Orçamento

Clique em **"Gerar PDF"** para:
1. Criar o orçamento no banco de dados
2. Ser redirecionado para a página de resultado
3. Visualizar todos os três pacotes

#### 6. Visualizar Resultado

Na página de resultado, você verá:
- ✅ Informações do cliente
- ✅ Lista de drinks selecionados com preços
- ✅ Resumo de valores (base, drinks, subtotal, taxa)
- ✅ Os 3 pacotes lado a lado com valores finais

#### 7. Exportar PDF

Clique em **"Baixar PDF"** para:
- Gerar um arquivo PDF profissional
- Enviar ao cliente por email
- Imprimir ou arquivar

### 💰 Exemplo de Cálculo

**Dados do Evento:**
- Quantidade: 50 convidados
- Drinks: Água (5), Refrigerante (8), Cerveja (15) = R$ 28 por pessoa
- Taxa de Serviço: 10%

**Cálculo:**
```
Valor Base = 50 × R$ 50 = R$ 2.500
Valor Drinks = 50 × R$ 28 = R$ 1.400
Subtotal = R$ 3.900

BRONZE (1.0x):
  Subtotal: R$ 3.900
  Taxa (10%): R$ 390
  TOTAL: R$ 4.290

PRATA (1.5x):
  Subtotal: R$ 5.850
  Taxa (10%): R$ 585
  TOTAL: R$ 6.435

OURO (2.0x):
  Subtotal: R$ 7.800
  Taxa (10%): R$ 780
  TOTAL: R$ 8.580
```

### 🎨 Customizações Possíveis

#### Alterar Valor Base por Pessoa

No arquivo `pages/orcamento-novo.html`, procure por:
```javascript
const valorPorPessoa = 50;
```

Altere para o valor desejado (ex: 60, 75, 100).

#### Adicionar Mais Drinks

No arquivo `pages/orcamento-novo.html`, procure por:
```javascript
const defaultDrinks = [
    { id: 1, name: 'Água', preco: 5 },
    // ... adicione mais drinks aqui
];
```

#### Alterar Multiplicadores dos Pacotes

No arquivo `js/packageCalculator.js`, altere:
```javascript
const PACKAGES = {
  BRONZE: { multiplier: 1.0, ... },
  PRATA: { multiplier: 1.5, ... },
  OURO: { multiplier: 2.0, ... }
};
```

### 🔴 Tema em Vermelho

O sistema foi atualizado para usar **vermelho (#dc2626)** como cor primária em:
- Botões principais
- Títulos de seções
- Bordas de destaque
- Links e elementos interativos

### 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (até 640px)

### 🐛 Troubleshooting

**Problema**: Drinks não aparecem na lista
- **Solução**: Clique no botão "Carregar Drinks"

**Problema**: Cálculos não atualizam
- **Solução**: Verifique se JavaScript está habilitado no navegador

**Problema**: PDF não gera
- **Solução**: Verifique se o navegador permite popups e downloads

**Problema**: Orçamento não salva
- **Solução**: Verifique se você está logado e se a conexão com o servidor está ativa

### 📊 Estrutura de Arquivos

```
DDrinks/
├── pages/
│   ├── orcamento-novo.html      # Página de criação de orçamento
│   └── resultado-novo.html       # Página de visualização e PDF
├── js/
│   └── packageCalculator.js      # Lógica de cálculo de pacotes
├── utils/
│   └── packageCalculator.js      # Lógica de cálculo (backend)
└── styles/
    └── theme.css                 # Tema visual (cor vermelha)
```

### 🔗 URLs Importantes

- **Novo Orçamento**: `/orcamento-novo`
- **Resultado**: `/resultado?id={id}`
- **Dashboard**: `/`
- **Login**: `/login`

### 💡 Dicas

1. **Salve os dados**: Todos os orçamentos são salvos no banco de dados
2. **Reutilize**: Você pode clonar orçamentos anteriores
3. **Customize**: Altere drinks, multiplicadores e valores conforme necessário
4. **Exporte**: Sempre exporte o PDF para enviar ao cliente

### 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do servidor
3. Confirme que o banco de dados está rodando
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

---

**Versão**: 2.0.0  
**Data**: Outubro 2025  
**Sistema**: DDrinks Multi-Pacotes

