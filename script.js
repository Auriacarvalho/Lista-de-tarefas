// Seleciona os elementos da interface
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

// Elementos de resumo
const completedCount = document.getElementById('completed-count');
const incompleteCount = document.getElementById('incomplete-count');

// Adiciona um evento para o formulário
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarregar a página

  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText);  // Adiciona uma nova tarefa
    taskInput.value = ''; // Limpa o campo de entrada
  }
});

// Função para adicionar uma tarefa
function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;

  // Botão de remoção
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    li.remove();
    updateTaskSummary();  // Atualiza o resumo após remover a tarefa
  });

  // Marcar como concluído
  li.addEventListener('click', () => {
    li.classList.toggle('completed');  // Alterna a classe 'completed'
    updateTaskSummary();  // Atualiza o resumo após marcar/desmarcar
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  updateTaskSummary(); // Atualiza o resumo após adicionar a tarefa
}

// Evento de pesquisa
searchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();

  const tasks = Array.from(taskList.children);
  tasks.forEach(task => {
    const taskText = task.textContent.toLowerCase();
    task.style.display = taskText.includes(searchValue) ? '' : 'none';  // Filtra as tarefas
  });
});

// Evento de filtro
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove a classe 'active' de todos os botões e adiciona ao botão clicado
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    filterTasks(filter);  // Filtra as tarefas conforme o botão clicado
  });
});

// Função para filtrar tarefas
function filterTasks(filter) {
  const tasks = Array.from(taskList.children);

  tasks.forEach(task => {
    switch (filter) {
      case 'all':
        task.style.display = '';  // Mostra todas as tarefas
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? '' : 'none';  // Mostra apenas as concluídas
        break;
      case 'incomplete':
        task.style.display = task.classList.contains('completed') ? 'none' : '';  // Mostra apenas as incompletas
        break;
    }
  });
}

// Função para atualizar o resumo
function updateTaskSummary() {
  const tasks = Array.from(taskList.children);

  const completed = tasks.filter(task => task.classList.contains('completed')).length;  // Conta as concluídas
  const incomplete = tasks.length - completed;  // Conta as incompletas

  // Atualiza os contadores no DOM
  completedCount.textContent = completed;
  incompleteCount.textContent = incomplete;
}
