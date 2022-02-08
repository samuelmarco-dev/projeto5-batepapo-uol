# projeto5-batepapo-uol
Projeto 5 - Bate-Papo UOL

Seu terceiro projeto com JavaScript será a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL.

- CHAT
    - [ ]  Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido
    - [ ]  Existem 3 tipos de mensagem:
        - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza
        - Mensagens reservadas (**Reservadamente**): deve ter o fundo rosa
        - Mensagens normais: devem ter o fundo branco
    - [ ]  A cada 3 segundos o site deve recarregar as mensagens do servidor para manter sempre atualizado
    - [ ]  O chat deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do chat ele deve scrollar para o final
        
        **Dica**: Você pode fazer com que um elemento apareça na tela utilizando a função `scrollIntoView`:
        
    - [ ]  As mensagens com **Reservadamente** só devem ser exibidas se o nome do destinatário for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)
        - Obs: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Manteremos dessa forma por fins didáticos :)

- ENTRADA NA SALA
  - [ ]  Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome
  - [ ]  Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário
    - Caso o servidor responda com sucesso, o usuário poderá entrar na sala
    - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso
  - [ ]  Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala"

- ENVIO DE MENSAGEM
  - [ ]  Ao enviar uma mensagem, esta deve ser enviada para o servidor
    - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat
    - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome)
- [ ]  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
