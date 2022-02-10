function entradarNaSala(elementoBotao){
    const entradaUsuario = elementoBotao.parentNode.parentNode.parentNode;
    entradaUsuario.classList.add('escondido');

    const inputNickname = document.querySelector('.tela-de-entrada section input');
    inputNickname.value = "";
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
