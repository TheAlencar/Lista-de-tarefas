# 📝 Task Timer & Alarm List

Este é um projeto de **Lista de Tarefas Inteligente** que monitora o tempo em tempo real para alertar sobre o vencimento de cada atividade. Desenvolvido como um estudo prático de manipulação do DOM e lógica de tempo em JavaScript.

## 🚀 Funcionalidades

* **Gerenciamento de Tarefas (CRUD):** Adicione, visualize, edite e remova tarefas com horários de início e fim.
* **Monitoramento em Tempo Real:** O sistema verifica a cada segundo se alguma tarefa atingiu o horário de término.
* **Sistema de Alerta Duplo:**
    * **Visual:** A tarefa pisca em vermelho na lista e o título da aba do navegador alterna para "⚠️ TAREFA VENCIDA!".
    * **Sonoro:** Um alarme toca em loop infinito até que a tarefa seja gerenciada.
* **Feedback de Interface:** Mensagens de confirmação que desaparecem suavemente após alguns segundos.
* **Limpeza Inteligente:** Botão para excluir toda a lista que silencia o alarme e reposiciona a tela no topo.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização moderna com Flexbox e animações `@keyframes`.
* **JavaScript (ES6+):**
    * `setInterval` para o motor de verificação.
    * `Audio API` para o gerenciamento do som.
    * Manipulação dinâmica do DOM.

## 📂 Como executar o projeto

1. Faça o download ou clone este repositório.
2. Certifique-se de que o arquivo de áudio está na mesma pasta do script.
3. Abra o arquivo `index.html` em seu navegador.
4. **Nota:** É necessário interagir com a página (clicar em qualquer lugar) para que o navegador permita a execução do som.

---
Desenvolvido por **Guilherme Alencar** 🚀
