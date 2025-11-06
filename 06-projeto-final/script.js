/* ============================================
   PROJETO FINAL: TO-DO LIST
   JavaScript - A Lógica da Aplicação
   
   Este arquivo contém toda a funcionalidade do To-Do List.
   Leia os comentários para entender como cada parte funciona!
   ============================================ */

// ===== 1. VARIÁVEIS E SELEÇÃO DE ELEMENTOS =====
// Primeiro, selecionamos todos os elementos HTML que vamos manipular

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Selecionamos todos os botões de filtro de uma vez
const filterBtns = document.querySelectorAll('.filter-btn');

// Elementos de contagem
const countAll = document.getElementById('countAll');
const countActive = document.getElementById('countActive');
const countCompleted = document.getElementById('countCompleted');

// ===== 2. ESTADO DA APLICAÇÃO =====
// Array que guarda todas as tarefas - este é o "cérebro" do app
let tarefas = [];

// Filtro atual selecionado (all, active, completed)
let filtroAtual = 'all';

console.log('✅ To-Do List inicializado!');
console.log('📝 Array de tarefas criado:', tarefas);

// ===== 3. FUNÇÕES PRINCIPAIS =====

/**
 * Função que adiciona uma nova tarefa
 * É chamada quando o usuário clica no botão ou pressiona Enter
 */
function adicionarTarefa() {
    // Pega o texto digitado e remove espaços extras
    const textoTarefa = taskInput.value.trim();
    
    // Validação: verifica se o campo não está vazio
    if (textoTarefa === '') {
        console.warn('⚠️ Tentativa de adicionar tarefa vazia');
        // Adiciona animação de shake para feedback visual
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 300);
        taskInput.focus();
        return; // Para a execução da função
    }
    
    // Cria um objeto representando a nova tarefa
    const novaTarefa = {
        id: Date.now(), // ID único baseado no timestamp
        texto: textoTarefa,
        completa: false,
        data: new Date().toLocaleString('pt-BR') // Data e hora de criação
    };
    
    // Adiciona a tarefa no array
    tarefas.push(novaTarefa);
    
    console.log('➕ Nova tarefa adicionada:', novaTarefa);
    console.log('📊 Total de tarefas:', tarefas.length);
    
    // Limpa o campo de input
    taskInput.value = '';
    taskInput.focus();
    
    // Atualiza a interface e salva no localStorage
    renderizarTarefas();
    salvarNoLocalStorage();
    atualizarContadores();
}

/**
 * Função que renderiza (desenha) todas as tarefas na tela
 * Esta função é chamada sempre que algo muda
 */
function renderizarTarefas() {
    console.log('🎨 Renderizando tarefas com filtro:', filtroAtual);
    
    // Limpa a lista atual
    taskList.innerHTML = '';
    
    // Filtra as tarefas baseado no filtro atual
    let tarefasFiltradas = tarefas;
    
    if (filtroAtual === 'active') {
        tarefasFiltradas = tarefas.filter(t => !t.completa);
    } else if (filtroAtual === 'completed') {
        tarefasFiltradas = tarefas.filter(t => t.completa);
    }
    
    console.log(`📋 Mostrando ${tarefasFiltradas.length} tarefa(s)`);
    
    // Se não há tarefas para mostrar, exibe mensagem
    if (tarefasFiltradas.length === 0) {
        emptyMessage.classList.remove('hidden');
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }
    
    // Cria um elemento HTML para cada tarefa
    tarefasFiltradas.forEach(tarefa => {
        const li = criarElementoTarefa(tarefa);
        taskList.appendChild(li);
    });
}

/**
 * Função que cria o elemento HTML de uma tarefa
 * Retorna um <li> completo com checkbox, texto e botão de deletar
 */
function criarElementoTarefa(tarefa) {
    // Cria o elemento <li>
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Adiciona classe 'completed' se a tarefa estiver completa
    if (tarefa.completa) {
        li.classList.add('completed');
    }
    
    // Cria o conteúdo HTML da tarefa usando template string
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${tarefa.completa ? 'checked' : ''}
            onchange="toggleTarefa(${tarefa.id})"
        >
        <span class="task-text">${escapeHTML(tarefa.texto)}</span>
        <span class="task-date">${tarefa.data}</span>
        <button 
            class="delete-btn" 
            onclick="deletarTarefa(${tarefa.id})"
        >
            🗑️ Excluir
        </button>
    `;
    
    return li;
}

/**
 * Função que marca/desmarca uma tarefa como completa
 * O parâmetro 'id' identifica qual tarefa deve ser alterada
 */
function toggleTarefa(id) {
    console.log('🔄 Alternando status da tarefa ID:', id);
    
    // Usa map para criar um novo array com a tarefa modificada
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            // Inverte o status de completa
            tarefa.completa = !tarefa.completa;
            console.log(`✓ Tarefa "${tarefa.texto}" agora está: ${tarefa.completa ? 'completa' : 'ativa'}`);
        }
        return tarefa;
    });
    
    // Atualiza tudo
    renderizarTarefas();
    salvarNoLocalStorage();
    atualizarContadores();
}

/**
 * Função que deleta uma tarefa
 * Remove a tarefa do array baseado no ID
 */
function deletarTarefa(id) {
    console.log('🗑️ Deletando tarefa ID:', id);
    
    // Encontra a tarefa para logar antes de deletar
    const tarefaDeletada = tarefas.find(t => t.id === id);
    if (tarefaDeletada) {
        console.log(`❌ Removendo: "${tarefaDeletada.texto}"`);
    }
    
    // Filter cria um novo array sem a tarefa com esse ID
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    
    console.log('📊 Tarefas restantes:', tarefas.length);
    
    // Atualiza tudo
    renderizarTarefas();
    salvarNoLocalStorage();
    atualizarContadores();
}

/**
 * Função que deleta todas as tarefas completas
 */
function limparCompletas() {
    const quantidadeAntes = tarefas.length;
    
    // Mantém apenas as tarefas não completas
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    
    const quantidadeRemovida = quantidadeAntes - tarefas.length;
    console.log(`🧹 Limpou ${quantidadeRemovida} tarefa(s) completa(s)`);
    
    // Atualiza tudo
    renderizarTarefas();
    salvarNoLocalStorage();
    atualizarContadores();
}

/**
 * Função que muda o filtro ativo (todas, ativas, completas)
 */
function mudarFiltro(novoFiltro) {
    console.log('🔍 Mudando filtro para:', novoFiltro);
    
    filtroAtual = novoFiltro;
    
    // Atualiza a aparência dos botões de filtro
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === novoFiltro) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Re-renderiza com o novo filtro
    renderizarTarefas();
}

/**
 * Função que atualiza os contadores de tarefas
 */
function atualizarContadores() {
    const totalTarefas = tarefas.length;
    const tarefasAtivas = tarefas.filter(t => !t.completa).length;
    const tarefasCompletas = tarefas.filter(t => t.completa).length;
    
    // Atualiza os números nos botões
    countAll.textContent = totalTarefas;
    countActive.textContent = tarefasAtivas;
    countCompleted.textContent = tarefasCompletas;
    
    // Desabilita o botão de limpar se não há tarefas completas
    clearCompletedBtn.disabled = tarefasCompletas === 0;
    
    console.log('📊 Contadores atualizados:', {
        total: totalTarefas,
        ativas: tarefasAtivas,
        completas: tarefasCompletas
    });
}

// ===== 4. LOCALSTORAGE - PERSISTÊNCIA DE DADOS =====

/**
 * Função que salva as tarefas no localStorage
 * Isso faz com que as tarefas não sejam perdidas ao fechar o navegador
 */
function salvarNoLocalStorage() {
    // Converte o array de tarefas para JSON (texto)
    const tarefasJSON = JSON.stringify(tarefas);
    
    // Salva no localStorage com a chave 'todolist-tarefas'
    localStorage.setItem('todolist-tarefas', tarefasJSON);
    
    console.log('💾 Tarefas salvas no localStorage');
}

/**
 * Função que carrega as tarefas do localStorage
 * É chamada quando a página é carregada
 */
function carregarDoLocalStorage() {
    console.log('📂 Carregando tarefas do localStorage...');
    
    // Tenta recuperar as tarefas salvas
    const tarefasSalvas = localStorage.getItem('todolist-tarefas');
    
    if (tarefasSalvas) {
        // Converte de volta de JSON para array
        tarefas = JSON.parse(tarefasSalvas);
        console.log(`✅ ${tarefas.length} tarefa(s) carregada(s)`);
    } else {
        console.log('ℹ️ Nenhuma tarefa salva encontrada');
    }
    
    // Renderiza as tarefas carregadas
    renderizarTarefas();
    atualizarContadores();
}

// ===== 5. FUNÇÕES AUXILIARES =====

/**
 * Função que escapa HTML para prevenir XSS
 * Converte caracteres especiais para entidades HTML
 */
function escapeHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ===== 6. EVENT LISTENERS - CONEXÃO COM A INTERFACE =====

// Botão de adicionar tarefa
addBtn.addEventListener('click', adicionarTarefa);

// Pressionar Enter no input também adiciona tarefa
taskInput.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

// Botões de filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filtro = btn.dataset.filter;
        mudarFiltro(filtro);
    });
});

// Botão de limpar completas
clearCompletedBtn.addEventListener('click', limparCompletas);

// ===== 7. INICIALIZAÇÃO =====

// Quando a página carrega, recupera as tarefas salvas
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Aplicação iniciada!');
    carregarDoLocalStorage();
});

// Carrega as tarefas imediatamente (caso DOMContentLoaded já tenha disparado)
carregarDoLocalStorage();

console.log('✨ Sistema de To-Do List pronto para uso!');
console.log('💡 Dica: Abra as ferramentas de desenvolvedor (F12) para ver os logs do que acontece!');
