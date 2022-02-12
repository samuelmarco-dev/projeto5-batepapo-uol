let nomeDeUsuario;
let objectoNickName;
let objectoOnline;
let objetoMensagemInput;

/* FUNÇÕES DE MANIPULAÇÃO DE TELA (INTERAÇÃO DO USUÁRIO) */
function entradarNaSala(elementoBotao) {
    const entradaUsuario = elementoBotao.parentNode.parentNode.parentNode;
    entradaUsuario.classList.add('escondido');
}

function telaParticipantesAtivos() {
    const abaDeParticipantes = document.querySelector('.tela-participantes');
    abaDeParticipantes.classList.remove('escondido');
}

function sairDaTela() {
    const iconeSaida = document.querySelector('.tela-participantes');
    iconeSaida.classList.add('escondido');
}

function selecionarParticipante(participanteEscolhido) {
    const selecionado = document.querySelector('.usuarios-disponiveis .selecionado');

    if (selecionado !== null) {
        selecionado.classList.remove('selecionado')
    }
    participanteEscolhido.classList.add('selecionado')
}

function selecionarTipoMensagem(tipoDeMensagem) {
    const selecionado = document.querySelector('.visibilidade-mensagem .selecionado');

    if (selecionado !== null) {
        selecionado.classList.remove('selecionado')
    }
    tipoDeMensagem.classList.add('selecionado')
}

/* FUNÇÕES DE TRATAMENTO DE PROMISES DO AXIOS */

function enviarNickname() {
    nomeDeUsuario = prompt("Insira seu nome de usuário (nickname) para entrar no chat UOL");
    objectoNickName = {
        name: `${nomeDeUsuario}`
    };
    objectoOnline = objectoNickName;

    if (nomeDeUsuario === null || nomeDeUsuario === undefined) {
        enviarNickname()
    }

    const urlEnviarNickname = "https://mock-api.driven.com.br/api/v4/uol/participants";
    axios.post(urlEnviarNickname, objectoNickName)
        .then((response) => {
            console.log(response.data);
            alert(`Seu nome de usuário no Bate-Papo UOL é ${nomeDeUsuario}`);
        })
        .catch((error) => {
            console.log(error.response);
            alert("Insira outro nome de usuário, este nome não é válido ou já está em uso!");
            enviarNickname();
        })
}
enviarNickname();

function usuarioEstaOnline() {
    objectoNickName = {
        name: `${nomeDeUsuario}`
    };
    objectoOnline = objectoNickName;
    const urlManterConexao = "https://mock-api.driven.com.br/api/v4/uol/status";
    axios.post(urlManterConexao, objectoOnline)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.response);
            alert("Você foi desconectado do Bate-Papo UOL por inatividade!");
            location.reload(true);
        })
    console.log(nomeDeUsuario, objectoNickName);
}
setTimeout(usuarioEstaOnline, 2000);

// Informar a cada 5 segundos na API se o usuário está online
setInterval(usuarioEstaOnline, 5000);

function buscarMensagens() {
    const urlBuscarMensagens = "https://mock-api.driven.com.br/api/v4/uol/messages";
    axios.get(urlBuscarMensagens)
        .then((response) => {
            console.log(response.data);
            renderizarMensagensNaTela(response.data);
        })
    // .catch((error)=>{
    //     console.log(error);
    //     buscarMensagens();
    // });
}
buscarMensagens();

// Recarrega as mensagens disponíveis na API a cada 3 segundos
setInterval(buscarMensagens, 3000);

function renderizarMensagensNaTela(mensagemAPI) {
    const areaDeMensagens = document.querySelector('main nav');
    console.log(areaDeMensagens);
    console.log(mensagemAPI.length);
    console.log(nomeDeUsuario);
    areaDeMensagens.innerHTML = "";

    for (let index = 0; index < mensagemAPI.length; index++) {
        const arrayMensagens = mensagemAPI[index];

        if (arrayMensagens.type === 'status') {
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida status" data-identifier="message">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>${arrayMensagens.text}</span></p>             
            </div>`;
        }
        if (arrayMensagens.type === 'message') {
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida" data-identifier="message">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>para</span><strong>${arrayMensagens.to}:</strong><span>${arrayMensagens.text}</span></p>
            </div>`;
        }
        if (arrayMensagens.type === 'private_message' && arrayMensagens.to === nomeDeUsuario) {
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida reservadamente" data-identifier="message">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>reservadamente</span><strong>${arrayMensagens.to}:</strong><span>${arrayMensagens.text}</span></p>
            </div>`;
        }
    }
    scrollBatePapo();
}

function scrollBatePapo() {
    const scrollMensagens = document.querySelector('nav');
    scrollMensagens.lastElementChild.scrollIntoView();
}

function buscarParticipantesAtivos() {
    const urlParticipantesAtivos = 'https://mock-api.driven.com.br/api/v4/uol/participants';
    axios.get(urlParticipantesAtivos)
        .then((response) => {
            console.log(response.data);
            renderizarParticipantesAtivos(response.data);
        })
        // .catch((error) => {
        //     console.log(error.response);
        // })
}
setTimeout(buscarParticipantesAtivos, 2500);

// Buscar lista de participantes ativos a cada 10 segundos
setInterval(buscarParticipantesAtivos, 10000);

function renderizarParticipantesAtivos(arrayDeParticipantes) {
    const participantesDisponiveis = document.querySelector('.tela-participantes .usuarios-disponiveis .participates-renderizados');
    participantesDisponiveis.innerHTML = "";

    for (let index = 0; index < arrayDeParticipantes.length; index++) {
        const elementoRenderizado = arrayDeParticipantes[index]
        participantesDisponiveis.innerHTML += `
<div class="todos-participantes" onclick="selecionarParticipante(this)">
            <div class="perfil-participantes flex">
                <ion-icon name="people"></ion-icon>
                <p>${elementoRenderizado.name}</p>
            </div>
            <div class="check opacidade">
                <img src="./assets/vector-checkmark.svg" alt="Vector Check">
            </div>
         </div>
        `
        if(elementoRenderizado.name === arrayDeParticipantes[index]){
            participantesDisponiveis.innerHTML = "";
        }
    }
}

function enviarMensagemAPI() {
    const mensagemDigitada = document.querySelector('.mensagem-reservadamente input');
    const destinoDaMensagem = 'Todos';
    const tipoDaMensagem = 'message';

    console.log(nomeDeUsuario, mensagemDigitada.value);
    const urlEnivarMensagem = "https://mock-api.driven.com.br/api/v4/uol/messages";
    objetoMensagemInput = {
        from: `${nomeDeUsuario}`,
        to: `${destinoDaMensagem}`,
        text: `${mensagemDigitada.value}`,
        type: `${tipoDaMensagem}`
    };
    console.log(objetoMensagemInput);
    axios.post(urlEnivarMensagem, objetoMensagemInput)
        .then((response) => {
            console.log(response.data);
            limparInputDoUsuario();
            //  alert(objetoMensagemInput);
        })
        .catch((error) => {
            console.log(error.response);
            if (objetoMensagemInput.text === "" || objetoMensagemInput.text === null) {
                alert('O servidor não aceita o envio de mensagens vazias. Você será redirecionado para a tela inicial');
            }
            location.reload(true);
        })
}

function limparInputDoUsuario() {
    const mensagemEnviada = document.querySelector('.mensagem-reservadamente input');
    mensagemEnviada.value = "";
}

document.addEventListener("keypress", function (teclaClicada) {
    if (teclaClicada.key === "Enter") {
        const enviarComEnter = document.querySelector('.mensagem-reservadamente input');
        enviarComEnter.click();
        enviarMensagemAPI();
    }
});

