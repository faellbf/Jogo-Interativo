let jogoAtual = null;
let saldo = 1000;
let apostas = [];

        // Função para carregar o jogo atual
function carregarJogo(jogo) {
    jogoAtual = jogo;
    document.querySelector('.jogos h2').textContent = jogo.nome;
    document.querySelector('.jogos ul').innerHTML = '';
    jogo.opcoes.forEach(opcao => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = opcao.nome;
        button.classList.add('opcao');
        button.addEventListener('click', () =>{
            apostar(opcao);
        });
        li.appendChild(button);
        document.querySelector('#jogosLista').appendChild(li);
    });
}

        // Função para apostar em uma opção
function apostar(opcao) {
    const aposta = parseInt(prompt(`Quanto você deseja apostar em ${opcao.nome}?`), 10);
    if (aposta > 0 && aposta <= saldo) {
        apostas.push({ opcao, valor: aposta });
        saldo -= aposta;
        document.querySelector('.saldo').textContent = `Saldo: ${saldo}`;
    } else {
        alert('Aposta inválida!');
    }
}

        // Função para realizar a ação do jogo
function realizarAcao() {
    if (jogoAtual) {
        const resultado = jogoAtual.realizarAcao(apostas);
        if (resultado) {
            alert(`Você ganhou ${resultado}!`);
            saldo += resultado;
            document.querySelector('.saldo').textContent = `Saldo: ${saldo}`;
        } else {
            alert('Você perdeu!');
        }
        apostas = [];
    }
}

        // Função para carregar os jogos disponíveis
function carregarJogos() {
    const jogos = [
        { 
            nome: 'Fortune Ox', 
            opcoes: [
                { nome: 'Vermelho' }, 
                { nome: 'Preto' }
            ],
            realizarAcao: (apostas) => {
                        // Simulação de resultado aleatório
                const chance = Math.random();
                const ganho = apostas.reduce((total, aposta) => total + aposta.valor, 0);
                return chance > 0.5 ? ganho * 2 : 0;
            }
        },
        { 
            nome: 'Outro Jogo', 
            opcoes: [
                { nome: 'Opção 1' }, 
                { nome: 'Opção 2' }
            ],
            realizarAcao: (apostas) => {
                        // Simulação de resultado aleatório
                const chance = Math.random();
                const ganho = apostas.reduce((total, aposta) => total + aposta.valor, 0);
                return chance > 0.5 ? ganho * 2 : 0;
            }
        },
    ];
    jogos.forEach(jogo => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = jogo.nome;
        button.addEventListener('click', () =>{
            carregarJogo(jogo);
        });
        li.appendChild(button);
        document.querySelector('#jogosLista').appendChild(li);
    });
}

        // Inicialização
carregarJogos();
document.querySelector('.saldo').textContent = `Saldo: ${saldo}`;
document.querySelector('.realizar-acao').addEventListener('click', realizarAcao);