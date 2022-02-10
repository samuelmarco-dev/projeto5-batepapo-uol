const nomeDeUsuario = prompt("Insira seu nome de usuário (nickname) para entrar no chat UOL");
const objectoNickName = {
    name: `${nomeDeUsuario}`
};
const objectoOnline = objectoNickName;

function enviarNickname(){
    
    const urlEnviarNickname = "https://mock-api.driven.com.br/api/v4/uol/participants";
    axios.post(urlEnviarNickname, objectoNickName)
    .then((response)=>{
        console.log(response.data);
        alert(`Seu nome de usuário é ${nomeDeUsuario}`);
    })
    .catch((error)=>{
        console.log(error.response);
        enviarNickname();
    })
}
enviarNickname();

function usuarioEstaOnline(){
    const urlManterConexao = "https://mock-api.driven.com.br/api/v4/uol/status";
    axios.post(urlManterConexao, objectoOnline)
    .then((response)=>{
        console.log(response.data)
    })
    .catch((error)=>{
        console.log(error.response)
    })
}
usuarioEstaOnline();

// Informar a cada 5 segundos na API se o usuário está online
setInterval(usuarioEstaOnline, 5000);

function buscarMensagens(){
    const urlBuscarMensagens = "https://mock-api.driven.com.br/api/v4/uol/messages";
    axios.get(urlBuscarMensagens)
    .then((response)=>{
        console.log(response.data);
        setTimeout(renderizarMensagensNaTela(response.data));
    })
    .catch((error)=>{
        console.log(error);
    });
}
// buscarMensagens();

// Recarrega as mensagens disponíveis na API a cada 3 segundos
// setInterval(buscarMensagens, 3000);

function renderizarMensagensNaTela(mensagemAPI){
    const areaDeMensagens = document.querySelector('nav');
    
    console.log(areaDeMensagens);
    console.log(mensagemAPI.length);    
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
        // if(arrayMensagens.type === 'private_message'){
        //     areaDeMensagens.innerHTML += `
        //     <div class="mensagem-exibida reservadamente">
        //         <p><small>(${arrayMensagens.time})</small><strong>${arrayMensagens.from}</strong><span>reservadamente</span><strong>${arrayMensagens.to}:</strong><span>${arrayMensagens.text}</span></p>
        //     </div>`;
        // }
    }
    const scrollMensagens = document.querySelector('nav');
    scrollMensagens.lastElementChild.scrollIntoView()
}
