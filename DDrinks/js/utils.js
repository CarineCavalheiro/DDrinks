/**
 * Utilitários para o Frontend do DDrinks
 */

// ===== API UTILITIES =====

/**
 * Faz uma requisição fetch com tratamento de erro padrão
 */
export async function apiCall(url, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erro ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

/**
 * GET request
 */
export function apiGet(url) {
  return apiCall(url, { method: 'GET' });
}

/**
 * POST request
 */
export function apiPost(url, data) {
  return apiCall(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

/**
 * PUT request
 */
export function apiPut(url, data) {
  return apiCall(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

/**
 * PATCH request
 */
export function apiPatch(url, data) {
  return apiCall(url, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

/**
 * DELETE request
 */
export function apiDelete(url) {
  return apiCall(url, { method: 'DELETE' });
}

// ===== DOM UTILITIES =====

/**
 * Seleciona um elemento do DOM
 */
export function $(selector) {
  return document.querySelector(selector);
}

/**
 * Seleciona múltiplos elementos do DOM
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Cria um elemento HTML
 */
export function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

/**
 * Mostra um elemento
 */
export function show(element) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) element.classList.remove('hidden');
}

/**
 * Esconde um elemento
 */
export function hide(element) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) element.classList.add('hidden');
}

/**
 * Toggle visibilidade de um elemento
 */
export function toggle(element) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) element.classList.toggle('hidden');
}

/**
 * Adiciona classe a um elemento
 */
export function addClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) element.classList.add(className);
}

/**
 * Remove classe de um elemento
 */
export function removeClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  if (element) element.classList.remove(className);
}

/**
 * Verifica se um elemento tem uma classe
 */
export function hasClass(element, className) {
  if (typeof element === 'string') {
    element = $(element);
  }
  return element ? element.classList.contains(className) : false;
}

// ===== NOTIFICATION UTILITIES =====

/**
 * Mostra uma notificação
 */
export function showNotification(message, type = 'info', duration = 3000) {
  const notification = createElement('div', `notification notification-${type} slide-in`);
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Mostra notificação de sucesso
 */
export function showSuccess(message, duration = 3000) {
  showNotification(message, 'success', duration);
}

/**
 * Mostra notificação de erro
 */
export function showError(message, duration = 3000) {
  showNotification(message, 'error', duration);
}

/**
 * Mostra notificação de aviso
 */
export function showWarning(message, duration = 3000) {
  showNotification(message, 'warning', duration);
}

/**
 * Mostra notificação de informação
 */
export function showInfo(message, duration = 3000) {
  showNotification(message, 'info', duration);
}

// ===== LOADING UTILITIES =====

/**
 * Mostra loading em um elemento
 */
export function showLoading(element, text = 'Carregando...') {
  if (typeof element === 'string') {
    element = $(element);
  }
  
  if (element) {
    element.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <div class="animate-spin">⏳</div>
        <span>${text}</span>
      </div>
    `;
    addClass(element, 'loading');
  }
}

/**
 * Esconde loading de um elemento
 */
export function hideLoading(element) {
  if (typeof element === 'string') {
    element = $(element);
  }
  
  if (element) {
    removeClass(element, 'loading');
  }
}

// ===== VALIDATION UTILITIES =====

/**
 * Valida email
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone
 */
export function isValidPhone(phone) {
  const regex = /^[\d\s\-\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Valida data
 */
export function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

/**
 * Valida se data é no futuro
 */
export function isFutureDate(dateString) {
  const date = new Date(dateString);
  return date > new Date();
}

/**
 * Valida número
 */
export function isValidNumber(value) {
  return !isNaN(value) && isFinite(value) && value >= 0;
}

/**
 * Valida senha forte
 */
export function isStrongPassword(password) {
  return password.length >= 8;
}

// ===== FORMAT UTILITIES =====

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
 * Formata data para formato brasileiro
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

/**
 * Formata data e hora
 */
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Formata número com separador de milhares
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Trunca texto com ellipsis
 */
export function truncate(text, length = 50) {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// ===== STORAGE UTILITIES =====

/**
 * Salva dados no localStorage
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

/**
 * Recupera dados do localStorage
 */
export function getFromStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Erro ao recuperar do localStorage:', error);
    return defaultValue;
  }
}

/**
 * Remove dados do localStorage
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
  }
}

/**
 * Limpa todo o localStorage
 */
export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
}

// ===== MISC UTILITIES =====

/**
 * Aguarda um tempo em milissegundos
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Copia texto para a área de transferência
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showSuccess('Copiado para a área de transferência!');
  } catch (error) {
    console.error('Erro ao copiar:', error);
    showError('Erro ao copiar para a área de transferência');
  }
}

/**
 * Gera um ID único
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce para funções
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle para funções
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

