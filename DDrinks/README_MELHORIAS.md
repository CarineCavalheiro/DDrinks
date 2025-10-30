# DDrinks - Sistema de Orçamentos para Bebidas 🍹

## Versão Melhorada

Este documento descreve as melhorias implementadas no sistema DDrinks.

### ✨ Melhorias Implementadas

#### 1. **Segurança Aprimorada**

- **CORS Configurável**: Substituído CORS aberto (`origin: true`) por whitelist de origens específicas
- **Headers de Segurança**: Adicionados headers HTTP para proteção contra ataques comuns:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security`
  
- **Validação de Entrada Aprimorada**:
  - Validação de email com regex
  - Validação de senha forte (mínimo 8 caracteres)
  - Validação de username (3-20 caracteres, apenas alfanuméricos)
  - Validação de telefone
  - Validação de data em formato ISO
  
- **Sessão Segura**:
  - Cookie `httpOnly` para prevenir XSS
  - `sameSite: 'strict'` para prevenir CSRF
  - `secure: true` em produção (requer HTTPS)

#### 2. **Refatoração de Código**

- **Imports Corrigidos**: Adicionado `import express` nos arquivos de rotas que estava faltando
- **Middleware de Validação**: Criado middleware reutilizável para validação de orçamentos
- **Pool de Conexões**: Melhorado gerenciamento de conexões com MySQL
- **Tratamento de Erros**: Middleware global de erro com logging estruturado
- **Estrutura de Pastas**: Criada pasta `middleware/` para componentes reutilizáveis

#### 3. **Melhorias de Logging**

- Timestamps ISO em todos os logs
- Logging estruturado de requisições
- Mensagens de erro mais descritivas
- Diferenciação entre ambientes (development/production)

#### 4. **Configuração de Ambiente**

- Arquivo `config.env` expandido com mais opções
- Suporte a variáveis de ambiente para CORS
- Configuração de logging
- Diferenciação clara entre development e production

#### 5. **Validação de Dados**

Novo arquivo `middleware/validators.js` com funções reutilizáveis:
- `isValidEmail()` - Validação de email
- `isStrongPassword()` - Validação de senha forte
- `isValidUsername()` - Validação de username
- `isValidPhone()` - Validação de telefone
- `isValidDate()` - Validação de data ISO
- `sanitizeInput()` - Sanitização de entrada
- `isValidNumber()` - Validação de números

### 🚀 Como Usar

#### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar MySQL
# Edite o arquivo config.env com suas credenciais:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ddrinks_db

# 3. Inicializar banco de dados
npm run setup

# 4. Executar em desenvolvimento
npm run dev

# 5. Acessar
# Abra http://localhost:3000 no navegador
```

#### Compilação para Produção

```bash
# Compilar TypeScript
npm run build

# Executar em produção
npm start
```

### 📋 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DB_HOST` | Host do MySQL | localhost |
| `DB_USER` | Usuário do MySQL | root |
| `DB_PASSWORD` | Senha do MySQL | (vazio) |
| `DB_NAME` | Nome do banco de dados | ddrinks_db |
| `DB_PORT` | Porta do MySQL | 3306 |
| `PORT` | Porta do servidor | 3000 |
| `NODE_ENV` | Ambiente (development/production) | development |
| `SESSION_SECRET` | Chave secreta de sessão | (padrão) |
| `ALLOWED_ORIGIN` | Origem CORS permitida | http://localhost:3000 |
| `LOG_LEVEL` | Nível de logging | info |

### 🔐 Recomendações de Segurança para Produção

1. **Alterar SESSION_SECRET**: Gere uma chave segura e aleatória
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Usar HTTPS**: Configure um certificado SSL/TLS válido

3. **Variáveis de Ambiente**: Use um gerenciador de secrets (AWS Secrets Manager, HashiCorp Vault, etc.)

4. **Banco de Dados**: 
   - Use senha forte para o usuário do MySQL
   - Restrinja acesso ao banco de dados
   - Faça backups regulares

5. **CORS**: Configure apenas as origens necessárias na variável `ALLOWED_ORIGIN`

6. **Rate Limiting**: Considere adicionar rate limiting para prevenir brute force

### 📁 Estrutura do Projeto

```
DDrinks/
├── middleware/
│   └── validators.js          # Funções de validação reutilizáveis
├── routes/
│   ├── auth.js                # Rotas de autenticação
│   └── orcamentos.js          # Rotas de orçamentos
├── index.ts                   # Arquivo principal do servidor
├── database.js                # Configuração e funções do banco de dados
├── config.env                 # Variáveis de ambiente
├── package.json               # Dependências do projeto
└── [arquivos HTML/CSS/JS]     # Interface do usuário
```

### 🛠️ Tecnologias Utilizadas

- **Backend**: Express.js, Node.js, TypeScript
- **Banco de Dados**: MySQL 2
- **Autenticação**: bcryptjs, express-session
- **Segurança**: CORS, helmet (recomendado adicionar)
- **Frontend**: HTML5, CSS3, JavaScript vanilla

### 📝 Próximas Melhorias Recomendadas

1. **Adicionar Helmet.js**: Middleware de segurança mais robusto
2. **Rate Limiting**: Implementar `express-rate-limit`
3. **Validação com Joi/Yup**: Validação mais robusta de schemas
4. **Logging Estruturado**: Implementar Winston ou Pino
5. **Testes Automatizados**: Jest ou Mocha para testes
6. **API Documentation**: Swagger/OpenAPI
7. **Caching**: Redis para melhor performance
8. **Dark Mode**: Implementar tema escuro na UI

### 🐛 Troubleshooting

**Erro: "Cannot find module 'express'"**
```bash
npm install
```

**Erro: "Conexão com MySQL recusada"**
- Verifique se MySQL está rodando
- Confirme as credenciais em `config.env`
- Verifique o host e porta

**Erro: "Porta 3000 já está em uso"**
- Altere a porta em `config.env`: `PORT=3001`
- Ou encerre o processo usando a porta: `lsof -i :3000` e `kill -9 <PID>`

### 📧 Suporte

Para dúvidas ou problemas, verifique o console do servidor para mensagens de erro detalhadas.

---

**Versão**: 1.1.0  
**Data**: Outubro 2025  
**Melhorias por**: Manus AI

