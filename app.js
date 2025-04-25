const { createApp } = Vue;

createApp({
  data() {
    return {
      novaTarefa: '',
      dataTarefa: '',
      horaTarefa: '',
      diaSemana: '',
      statusTarefa: '',
      tarefas: JSON.parse(localStorage.getItem('tarefas')) || []
    };
  },
  methods: {
    adicionarTarefa() {
      if (!this.novaTarefa || !this.dataTarefa || !this.horaTarefa || !this.diaSemana || !this.statusTarefa) {
        alert('Preencha todos os campos!');
        return;
      }

      this.tarefas.push({
        texto: this.novaTarefa.trim(),
        data: this.dataTarefa,
        hora: this.horaTarefa,
        diaSemana: this.diaSemana,
        status: this.statusTarefa
      });

      this.salvarLocalStorage();

      // Resetar inputs
      this.novaTarefa = '';
      this.dataTarefa = '';
      this.horaTarefa = '';
      this.diaSemana = '';
      this.statusTarefa = '';
    },
    removerTarefa(tarefa) {
      const index = this.tarefas.indexOf(tarefa);
      if (index > -1) {
        this.tarefas.splice(index, 1);
        this.salvarLocalStorage();
      }
    },
    salvarLocalStorage() {
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    },
    formatarData(data) {
      const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(data + 'T00:00').toLocaleDateString('pt-BR', opcoes);
    },
    filtrarPorStatus(status) {
      return this.tarefas.filter(t => t.status === status);
    },
    corDeFundo(status) {
      switch (status) {
        case 'Concluída': return 'bg-green-100';
        case 'Em andamento': return 'bg-yellow-100';
        case 'Pendente': return 'bg-orange-100';
        default: return 'bg-white';
      }
    }
  }
}).mount('#app');