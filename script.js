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
            mensagem.style.color = "red"
      } else {
            mensagem.style.opacity = "1";
            let mensagemSUCESSO = "Tarefa adicionada com sucesso";
            mensagem.textContent = mensagemSUCESSO;
            mensagem.style.color = "green"
            setTimeout(() => {
                  mensagem.style.opacity = "0";
                  setTimeout(() => { mensagem.textContent = ""; }, 500);
            }, 3000);

            // ADICIONADO: alertaTocado: false
            tarefas.push({
                  texto: tarefaTexto,
                  inicio: horaInicio,
                  fim: horaFim,
                  alertaTocado: false // Inicializa como falso
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

            let botaoEditar = document.createElement("button")
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

function removerTarefa(i) {
      tarefas.splice(i, 1);
      pararSom(); 
      renderizarTarefas(); 
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

            tarefas[i].alertaTocado = false; // Permite que o som toque novamente no novo horário
            pararSom(); // PARA O SOM NA HORA

            renderizarTarefas();
      }
}
function Limparlista() {
    pararSom(); 
    tarefas = []; 
    renderizarTarefas();
    
    // FAZ A PÁGINA SUBIR PARA O TOPO PARA O USUÁRIO VER A MENSAGEM
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const mensagem = document.getElementById("mensagem");
    if (mensagem) {
        mensagem.style.opacity = "1"; // Garante que a opacidade esteja visível
        mensagem.textContent = "Lista excluída com sucesso";
        mensagem.style.color = "orange";

        setTimeout(() => {
            mensagem.style.opacity = "0";
            setTimeout(() => { mensagem.textContent = ""; }, 500);
        }, 3000);
    }
}

const somAlerta = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

somAlerta.loop = true;

function pararSom() {
    // Verifica se o som existe antes de tentar pausar
    if (somAlerta) {
        somAlerta.pause();
        somAlerta.currentTime = 0;
    }
    // Para o piscar da aba
    if (typeof pararPiscarAba === "function") {
        pararPiscarAba();
    }
}

function verificarAlertas() {
      const agora = new Date();
      const horaAtual = agora.toTimeString().slice(0, 5);

      for (let i = 0; i < tarefas.length; i++) {
            const tarefaElemento = document.getElementById(`tarefa-${i}`);
            const tarefa = tarefas[i];

            if (tarefa.fim <= horaAtual) {
                  if (tarefaElemento) {
                        tarefaElemento.classList.add('alerta-tarefa');

                        // TOCAR O SOM:
                        // Verificamos se o som já foi tocado para esta tarefa para não virar um loop infinito
                        if (!tarefa.alertaTocado) {
                              somAlerta.play().catch(e => console.log("O navegador bloqueou o som até que você interaja com a página."));
                              tarefa.alertaTocado = true; // Marca que o som já tocou
                              iniciarPiscarAba();
                        }
                  }
            } else {
                  if (tarefaElemento) {
                        tarefaElemento.classList.remove('alerta-tarefa');
                        tarefa.alertaTocado = false; // Reseta caso o usuário edite a hora para o futuro
                  }
            }
      }
}

// Chame a função para verificar os alertas a cada segundo
// Adicione esta linha no final do seu arquivo script.js, após todas as funções
setInterval(verificarAlertas, 1000);

let intervaloAba = null; // Guarda o timer para podermos parar depois
const tituloOriginal = document.title; // Salva o título "Lista de Tarefas"

function iniciarPiscarAba() {
    // Se já estiver piscando, não cria outro timer
    if (intervaloAba) return;

    intervaloAba = setInterval(() => {
        // Alterna entre o título original e um aviso
        document.title = (document.title === tituloOriginal) 
            ? "⚠️ TAREFA VENCIDA!" 
            : tituloOriginal;
    }, 1000); // Muda a cada 1 segundo
}

function pararPiscarAba() {
    clearInterval(intervaloAba);
    intervaloAba = null;
    document.title = tituloOriginal; // Devolve o título normal
}
