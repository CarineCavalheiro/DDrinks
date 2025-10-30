# Guia de Testes - DDrinks Melhorado

Este documento descreve como testar as melhorias implementadas no sistema DDrinks.

## 📋 Pré-requisitos

- Node.js 16+ instalado
- MySQL 5.7+ instalado e rodando
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Setup para Testes

### 1. Preparar o Ambiente

```bash
# Entrar no diretório do projeto
cd DDrinks

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Edite o arquivo config.env com suas credenciais MySQL
nano config.env
```

### 2. Inicializar o Banco de Dados

```bash
# Executar setup
npm run setup

# Você deve ver:
# ✅ Conexão com MySQL estabelecida com sucesso!
# ✅ Banco de dados inicializado com sucesso!
```

### 3. Iniciar o Servidor

```bash
# Em desenvolvimento
npm run dev

# Você deve ver:
# 🚀 Servidor rodando na porta 3000
# 📱 Acesse: http://localhost:3000
# 🔐 Login: http://localhost:3000/login
# 🔧 Ambiente: development
```

## ✅ Testes de Funcionalidade

### Teste 1: Autenticação e Registro

**Objetivo**: Verificar se o sistema de autenticação funciona corretamente

1. Acesse http://localhost:3000/login
2. Clique em "Cadastre-se aqui"
3. Preencha o formulário com:
   - Nome: "João Silva"
   - Usuário: "joaosilva"
   - Email: "joao@example.com"
   - Senha: "senha123456"
   - Confirmar Senha: "senha123456"
4. Clique em "Cadastrar"
5. **Esperado**: Redirecionamento para o dashboard

**Testes Adicionais**:
- Tente registrar com email inválido → Deve mostrar erro
- Tente registrar com senha < 8 caracteres → Deve mostrar erro
- Tente registrar com usuário já existente → Deve mostrar erro
- Tente registrar com senhas diferentes → Deve mostrar erro

### Teste 2: Login

**Objetivo**: Verificar se o login funciona corretamente

1. Acesse http://localhost:3000/login
2. Preencha com:
   - Usuário: "joaosilva"
   - Senha: "senha123456"
3. Clique em "Entrar"
4. **Esperado**: Redirecionamento para o dashboard

**Testes Adicionais**:
- Tente login com credenciais inválidas → Deve mostrar erro
- Tente login sem preencher campos → Deve mostrar erro
- Teste toggle de visibilidade de senha → Deve alternar entre • e texto

### Teste 3: Criar Orçamento

**Objetivo**: Verificar se é possível criar um novo orçamento

1. No dashboard, clique em "Novo Orçamento"
2. Preencha o formulário com:
   - Cliente: "Maria Santos"
   - Telefone: "(11) 98765-4321"
   - Cidade: "São Paulo"
   - Data do Evento: Data futura (ex: 2025-12-25)
   - Quantidade de Convidados: "50"
   - Descrição: "Festa de aniversário"
3. Clique em "Criar Orçamento"
4. **Esperado**: Orçamento criado com sucesso, aparece na lista

**Testes Adicionais**:
- Tente criar orçamento com data no passado → Deve mostrar erro
- Tente criar com campos vazios → Deve mostrar erro
- Tente criar dois orçamentos na mesma data → Deve mostrar erro

### Teste 4: Editar Orçamento

**Objetivo**: Verificar se é possível editar um orçamento

1. Clique em um orçamento da lista
2. Clique em "Editar"
3. Altere o campo "Cliente" para "João Silva"
4. Clique em "Salvar"
5. **Esperado**: Orçamento atualizado, dados refletidos na lista

### Teste 5: Deletar Orçamento

**Objetivo**: Verificar se é possível deletar um orçamento

1. Clique em um orçamento da lista
2. Clique em "Deletar"
3. Confirme a exclusão
4. **Esperado**: Orçamento removido da lista

### Teste 6: Atualizar Status

**Objetivo**: Verificar se é possível alterar o status de um orçamento

1. Clique em um orçamento
2. Altere o status para "Aceito"
3. Clique em "Salvar"
4. **Esperado**: Status atualizado, refletido na lista

### Teste 7: Dashboard e Estatísticas

**Objetivo**: Verificar se as estatísticas são calculadas corretamente

1. Acesse o dashboard
2. Verifique se os cards mostram:
   - Total de Orçamentos
   - Orçamentos Aceitos
   - Orçamentos Pendentes
   - Valor Total
   - Valor Total Aceito
3. **Esperado**: Números correspondem aos orçamentos criados

### Teste 8: Logout

**Objetivo**: Verificar se o logout funciona corretamente

1. Clique no menu do usuário
2. Clique em "Sair"
3. **Esperado**: Redirecionamento para login, sessão encerrada

## 🔐 Testes de Segurança

### Teste 1: CORS

**Objetivo**: Verificar se CORS está configurado corretamente

```bash
# Teste com curl
curl -H "Origin: http://malicious-site.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://localhost:3000/api/auth/login -v

# Esperado: Erro CORS ou sem header Access-Control-Allow-Origin
```

### Teste 2: Validação de Entrada

**Objetivo**: Verificar se a validação de entrada funciona

1. Abra o console do navegador (F12)
2. Tente enviar dados inválidos via API:

```javascript
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    nome: '<script>alert("xss")</script>',
    username: 'test',
    email: 'invalid-email',
    password: '123'
  })
})
```

**Esperado**: Validação rejeita dados inválidos

### Teste 3: Autenticação Obrigatória

**Objetivo**: Verificar se rotas protegidas exigem autenticação

1. Faça logout
2. Tente acessar http://localhost:3000/api/orcamentos
3. **Esperado**: Erro 401 Unauthorized

### Teste 4: Headers de Segurança

**Objetivo**: Verificar se headers de segurança estão presentes

```bash
curl -I http://localhost:3000/

# Esperado: Headers como
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

## 🎨 Testes de UX/UI

### Teste 1: Responsividade

1. Abra o navegador em modo responsivo (F12 → Toggle device toolbar)
2. Teste em diferentes tamanhos:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
3. **Esperado**: Layout se adapta corretamente

### Teste 2: Notificações

1. Crie um novo orçamento
2. **Esperado**: Notificação de sucesso aparece e desaparece

### Teste 3: Loading States

1. Clique em "Criar Orçamento"
2. **Esperado**: Botão mostra estado de loading durante requisição

### Teste 4: Validação em Tempo Real

1. Preencha um campo de email com valor inválido
2. **Esperado**: Mensagem de erro aparece

## 📊 Testes de Performance

### Teste 1: Tempo de Carregamento

```bash
# Medir tempo de resposta da API
curl -w "Tempo: %{time_total}s\n" http://localhost:3000/api/orcamentos
```

**Esperado**: < 500ms

### Teste 2: Listagem de Orçamentos

1. Crie 100+ orçamentos
2. Acesse a lista
3. **Esperado**: Carregamento rápido, sem travamento

## 🐛 Testes de Erro

### Teste 1: Banco de Dados Desconectado

1. Desligue o MySQL
2. Tente criar um orçamento
3. **Esperado**: Mensagem de erro clara

### Teste 2: Servidor Indisponível

1. Desligue o servidor
2. Tente acessar http://localhost:3000
3. **Esperado**: Erro de conexão

## 📝 Checklist de Testes

- [ ] Registro de usuário funciona
- [ ] Login funciona
- [ ] Criar orçamento funciona
- [ ] Editar orçamento funciona
- [ ] Deletar orçamento funciona
- [ ] Alterar status funciona
- [ ] Dashboard mostra estatísticas corretas
- [ ] Logout funciona
- [ ] CORS está configurado
- [ ] Validação de entrada funciona
- [ ] Headers de segurança estão presentes
- [ ] Layout responsivo em mobile
- [ ] Notificações funcionam
- [ ] Loading states funcionam
- [ ] Mensagens de erro são claras
- [ ] Performance é aceitável

## 🚨 Problemas Conhecidos e Soluções

### Erro: "Cannot find module 'express'"

**Solução**: Execute `npm install`

### Erro: "Conexão com MySQL recusada"

**Solução**: 
1. Verifique se MySQL está rodando
2. Confirme credenciais em `config.env`
3. Crie o banco de dados manualmente se necessário

### Erro: "Porta 3000 já está em uso"

**Solução**: 
1. Altere `PORT` em `config.env`
2. Ou encerre o processo: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### Notificações não aparecem

**Solução**: Verifique se o CSS está carregado corretamente

## 📞 Suporte

Se encontrar problemas durante os testes:

1. Verifique o console do navegador (F12)
2. Verifique os logs do servidor (terminal)
3. Verifique o arquivo `config.env`
4. Tente limpar cache do navegador (Ctrl+Shift+Delete)

---

**Última atualização**: Outubro 2025

