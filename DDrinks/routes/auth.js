import express from 'express';
import bcrypt from 'bcryptjs';
import { executeQuery } from '../database.js';

const router = express.Router();

// Middleware para verificar se o usuário está logado
export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }
  next();
};

// Validação de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de senha forte
const isStrongPassword = (password) => {
  return password.length >= 8;
};

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { nome, username, email, password, confirmPassword } = req.body;

    // Validações básicas
    if (!nome || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Validar email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Validar senha forte
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }

    // Validar confirmação de senha
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Validar username
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ message: 'Username deve ter entre 3 e 20 caracteres' });
    }

    // Verifica se o usuário já existe
    const existingUser = await executeQuery(
      'SELECT id FROM usuarios WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Usuário ou email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insere o novo usuário
    const result = await executeQuery(
      'INSERT INTO usuarios (nome, username, email, password) VALUES (?, ?, ?, ?)',
      [nome, username, email, hashedPassword]
    );

    // Define a sessão
    req.session.userId = result.insertId;
    req.session.username = username;
    req.session.email = email;

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: result.insertId,
        nome,
        username,
        email
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username e senha são obrigatórios' });
    }

    // Busca o usuário
    const users = await executeQuery(
      'SELECT * FROM usuarios WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = users[0];

    // Verifica a senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Define a sessão
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        nome: user.nome,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

// Rota para verificar se o usuário está logado
router.get('/check', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        email: req.session.email
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Rota para obter dados do usuário logado
router.get('/user', requireAuth, async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT id, nome, username, email FROM usuarios WHERE id = ?',
      [req.session.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;

