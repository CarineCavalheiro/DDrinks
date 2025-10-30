import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config({ path: './config.env' });

// Importa as rotas
import authRoutes from './routes/auth.js';
import orcamentoRoutes from './routes/orcamentos.js';
import { initializeDatabase, testConnection } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuração de CORS mais segura
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares de segurança
app.use(cors(corsOptions));

// Middleware de segurança adicional
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuração de sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'ddrinks-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production', // true apenas em produção com HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/orcamentos', orcamentoRoutes);

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Rotas para servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/agenda', (req, res) => {
  res.sendFile(path.join(__dirname, 'agenda.html'));
});

app.get('/resultado', (req, res) => {
  res.sendFile(path.join(__dirname, 'resultado.html'));
});

app.get('/datas', (req, res) => {
  res.sendFile(path.join(__dirname, 'datas.html'));
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  
  // Erro de CORS
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS error: origem não permitida' });
  }

  res.status(err.status || 500).json({ 
    message: 'Erro interno do servidor',
    error: NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicialização do servidor
async function startServer() {
  try {
    // Testa conexão com o banco
    await testConnection();
    
    // Inicializa o banco de dados
    await initializeDatabase();
    
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📱 Acesse: http://localhost:${PORT}`);
      console.log(`🔐 Login: http://localhost:${PORT}/login`);
      console.log(`🔧 Ambiente: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

