let nomeDeUsuario;
let objectoNickName;
let objectoOnline;

/* FUNÇÕES DE MANIPULAÇÃO DE TELA (INTERAÇÃO DO USUÁRIO) */
function entradarNaSala(elementoBotao){
    const entradaUsuario = elementoBotao.parentNode.parentNode.parentNode;
    entradaUsuario.classList.add('escondido');
}

function telaParticipantesAtivos(){
    const abaDeParticipantes = document.querySelector('.tela-participantes');
    abaDeParticipantes.classList.remove('escondido');
}

function sairDaTela(){
    const iconeSaida = document.querySelector('.tela-participantes');
    iconeSaida.classList.add('escondido');
}

// function selecionarParticipante(participanteEscolhido){
//     const teste = participanteEscolhido.querySelector('.check');
//     const apagarIcone = participanteEscolhido.children[1]
//     console.log(teste, participanteEscolhido, participanteEscolhido.children, apagarIcone);

//     if(teste.classList.contains('escondido') === true){
//         teste.classList.remove('escondido');
//     }
//     else if(apagarIcone.classList.contains('escondido') === false){
//         apagarIcone.classList.add('escondido');
//     }
   
// }

/* FUNÇÕES DE TRATAMENTO DE PROMISES DO AXIOS */

function enviarNickname(){
    nomeDeUsuario = prompt("Insira seu nome de usuário (nickname) para entrar no chat UOL");
    objectoNickName = {
        name: `${nomeDeUsuario}`
    };
    objectoOnline = objectoNickName;

    if(nomeDeUsuario === null || nomeDeUsuario === undefined){
        enviarNickname()
    }

    const urlEnviarNickname = "https://mock-api.driven.com.br/api/v4/uol/participants";
    axios.post(urlEnviarNickname, objectoNickName)
    .then((response)=>{
        console.log(response.data);
        alert(`Seu nome de usuário no Bate-Papo UOL é ${nomeDeUsuario}`);
    })
    .catch((error)=>{
        console.log(error.response);
        alert("Insira outro nome de usuário, este nome não é válido ou já está em uso!");
        enviarNickname();
    })
}
enviarNickname();

function usuarioEstaOnline(){
objectoNickName = {
    name: `${nomeDeUsuario}`
};
objectoOnline = objectoNickName;
const urlManterConexao = "https://mock-api.driven.com.br/api/v4/uol/status";
    axios.post(urlManterConexao, objectoOnline)
    .then((response)=>{
        console.log(response.data)
    })
    .catch((error)=>{
        console.log(error.response);
        alert("Você foi desconectado do Bate-Papo UOL por inatividade!");
        location.reload(true);
    })
console.log(nomeDeUsuario, objectoNickName);
}
setTimeout(usuarioEstaOnline, 2000);

// Informar a cada 5 segundos na API se o usuário está online
setInterval(usuarioEstaOnline, 5000);

function buscarMensagens(){
    const urlBuscarMensagens = "https://mock-api.driven.com.br/api/v4/uol/messages";
    axios.get(urlBuscarMensagens)
    .then((response)=>{
        console.log(response.data);
        renderizarMensagensNaTela(response.data);
    })
    // .catch((error)=>{
    //     console.log(error);
    //     buscarMensagens();
    // });
}
setTimeout(buscarMensagens, 2500);

// Recarrega as mensagens disponíveis na API a cada 3 segundos
setInterval(buscarMensagens, 3000);

function renderizarMensagensNaTela(mensagemAPI){
    const areaDeMensagens = document.querySelector('nav');
    console.log(areaDeMensagens);
    console.log(mensagemAPI.length);  
    console.log(nomeDeUsuario);

    for(let index = 0; index < mensagemAPI.length; index++){
        const arrayMensagens = mensagemAPI[index];
        if(arrayMensagens.type === 'status'){
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida status">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>${arrayMensagens.text}</span></p>             
            </div>`;
        }
        if(arrayMensagens.type === 'message'){
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>para</span><strong>${arrayMensagens.to}:</strong><span>${arrayMensagens.text}</span></p>
            </div>`;
        }
        if(arrayMensagens.type === 'private_message' && arrayMensagens.to === nomeDeUsuario){
            areaDeMensagens.innerHTML += `
            <div class="mensagem-exibida reservadamente">
                <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>reservadamente</span><strong>${arrayMensagens.to}:</strong><span>${arrayMensagens.text}</span></p>
            </div>`;
        }
    }
    scrollBatePapo();
}

function scrollBatePapo(){
    const scrollMensagens = document.querySelector('nav');
    scrollMensagens.lastElementChild.scrollIntoView();
}

function enviarMensagemAPI(){
    const mensagemDigitada = document.querySelector('.mensagem-reservadamente input');
    console.log(nomeDeUsuario, mensagemDigitada.value);
    const tipoDeMensagem = "Todos";
    const urlEnivarMensagem = "https://mock-api.driven.com.br/api/v4/uol/messages";
    const objetoMensagemInput = {
        from: `${nomeDeUsuario}`,
        to: `${tipoDeMensagem}`,
        text: `${mensagemDigitada.value}`,
        type: "message"
    };
    axios.post(urlEnivarMensagem, objetoMensagemInput)
    .then((response)=>{
        console.log(response.data);
         limparInputDoUsuario();
        //  alert(objetoMensagemInput);
        //  buscarMensagens();
    })
    .catch((error)=>{
        console.log(error.response);
        alert("deu ruim");
        // location.reload(true);
    })
}

function limparInputDoUsuario(){
    const mensagemEnviada = document.querySelector('.mensagem-reservadamente input');
    mensagemEnviada.value = "";
}