// task-list.js
class TaskList extends HTMLElement {
  constructor() {
      super();
      this.tasks = [];
      this.attachShadow({ mode: 'open' });
      this.render();
  }

  render() {
      const template = `
          <div class="task-list">
              ${this.tasks.map(task => this.renderTask(task)).join('')}
              <div class="add-task-form">
                  <input type="text" placeholder="Добавить новую задачу">
                  <button id="addTaskButton">Добавить</button>
              </div>
          </div>
      `;

      this.shadowRoot.innerHTML = template;
      this.addEventListeners();
  }

  renderTask(task) {
      return `
          <div class="task">
              <input type="checkbox" ${task.completed ? 'checked' : ''}>
              <span>${task.text}</span>
              <button data-id="${task.id}">Удалить</button>
          </div>
      `;
  }

  addEventListeners() {
      this.shadowRoot.getElementById('addTaskButton').addEventListener('click', () => this.addTask());
      this.shadowRoot.querySelectorAll('.task button').forEach(button => {
          button.addEventListener('click', (event) => this.removeTask(event.target.dataset.id));
      });
      this.shadowRoot.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
          checkbox.addEventListener('change', () => this.toggleTask(index));
      });
  }

  toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.render();
  }

  addTask() {
      const input = this.shadowRoot.querySelector('input[type="text"]');
      const text = input.value.trim();

      if (text !== '') {
          this.tasks.push({ id: Date.now(), text, completed: false });
          input.value = '';
          this.render();
      }
  }

  removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== parseInt(id));
      this.render();
  }
}

customElements.define('task-list', TaskList);

