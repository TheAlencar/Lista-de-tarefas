let tarefas = []

function adicionarTarefa() {
     const inputTarefa = document.getElementById("inputTarefa");
     const inputHoraInicio = document.getElementById("horaInicio");
     const inputHoraFim = document.getElementById("horaFim");

     let tarefaTexto = inputTarefa.value.trim()
     let horaInicio = inputHoraInicio.value;
     let horaFim = inputHoraFim.value;

       const mensagem = document.getElementById("mensagem")
       
       if (tarefaTexto === "" || horaInicio === "" || horaFim === "") {
            let mensagemERRO = "Inclua algo na lista"
            mensagem.textContent = mensagemERRO
            mensagem.style.color ="red"
      } else { 
            let mensagemSUCESSO = "Tarefa adicionada com sucesso";
            mensagem.textContent = mensagemSUCESSO;
            mensagem.style.color = "green"
            
               // Salva a tarefa como um objeto
             tarefas.push({
            texto: tarefaTexto,
            inicio: horaInicio,
            fim: horaFim
            });
            renderizarTarefas();
      } 

      inputTarefa.value = "";
      inputHoraInicio.value = "";
      inputHoraFim.value = "";
}
function renderizarTarefas() {
       const ListaTarefas = document.getElementById("ListaTarefas");
       ListaTarefas.innerHTML = ""
       
       for (let i = 0; i < tarefas.length; i++) {
       // objeto da tarefa atual, para fácil acesso
       const tarefa = tarefas[i]
       
       let NovaTarefa = document.createElement("li");

       NovaTarefa.id = `tarefa-${i}`
       NovaTarefa.textContent = `${tarefa.texto} (Início: ${tarefa.inicio} | Fim: ${tarefa.fim})`;
       
       let botaoderemover = document.createElement("button")
       botaoderemover.className = "remover"
       botaoderemover.textContent = "Remover"
       botaoderemover.onclick = () => removerTarefa(i)

       let botaoEditar= document.createElement("button")
       botaoEditar.className = "editar"
       botaoEditar.textContent = "Editar"
       botaoEditar.onclick = () => editarTarefa(i)

       NovaTarefa.appendChild(botaoderemover)     
       NovaTarefa.appendChild(botaoEditar)
       ListaTarefas.appendChild(NovaTarefa);
}
       
       const limparContainer = document.getElementById("limparContainer")
      limparContainer.innerHTML = "";
      if (tarefas.length > 0) {
            let botaoLimpar = document.createElement("button");
            botaoLimpar.textContent = "Limpar tudo";
            botaoLimpar.className = "botao-limpar";
            botaoLimpar.onclick = Limparlista;
            limparContainer.appendChild(botaoLimpar);
      }
}

function removerTarefa (i) {
      tarefas.splice ( i, 1)
      renderizarTarefas()
}

function editarTarefa(i) {
    let novaTarefaTexto = prompt("Edite a tarefa:", tarefas[i].texto);
    let novaHoraInicio = prompt("Edite a hora de início", tarefas[i].inicio);
    let novaHoraFim = prompt("Edite a hora de fim", tarefas[i].fim);

    // Certifique-se de que o usuário não cancelou a edição e preencheu todos os campos
    if (novaTarefaTexto !== null && novaTarefaTexto.trim() !== "" &&
        novaHoraInicio !== null && novaHoraInicio.trim() !== "" &&
        novaHoraFim !== null && novaHoraFim.trim() !== "") {
        
        tarefas[i].texto = novaTarefaTexto;
        tarefas[i].inicio = novaHoraInicio;
        tarefas[i].fim = novaHoraFim;
        
        renderizarTarefas();
    }
}
function Limparlista() {
      tarefas.length = 0
      renderizarTarefas()
      const mensagem = document.getElementById("mensagem")
      mensagem.textContent = "Lista excluída com sucesso"
}

function verificarAlertas() {
      const agora = new Date()
      const horaAtual = agora.toTimeString().slice(0, 5) // Exemplo: "14:30"

      for (let i = 0; i < tarefas.length; i++) {
            const tarefaElemento = document.getElementById(`tarefa-${i}`);
            const tarefa = tarefas[i];
            
         // Compara a hora final da tarefa com a hora atual 
      if (tarefa.fim <= horaAtual) {
           
        // Se a hora final for igual ou anterior à hora atual, ativa o alerta 
       if (tarefaElemento) {
            // adiciona uma classe CSS para o alerta visual
            tarefaElemento.classList.add('alerta-tarefa')
       }
      } else {
            // se o horário ainda não foi atingindo , remove a classe de alerta 
            if (tarefaElemento) {
                  tarefaElemento.classList.remove('alerta-tarefa')
            }
      }
            
      }
}
// Chame a função para verificar os alertas a cada segundo
// Adicione esta linha no final do seu arquivo script.js, após todas as funções
setInterval(verificarAlertas, 1000); 