# 🌎 GeoMaster: Desafio de Bandeiras (Modo Sobrevivência) 🌍

O GeoMaster é um jogo de quiz geográfico desenvolvido com tecnologias web modernas. Diferente de jogos de perguntas e respostas tradicionais, este projeto foca na dificuldade extrema e na agilidade, desafiando o jogador a acertar todas as bandeiras do mundo em uma única sequência.

---

## 📋 Sobre o Projeto

O objetivo deste projeto foi criar uma aplicação interativa, leve e responsiva que consome dados reais de uma API externa. O jogo não possui níveis de dificuldade selecionáveis; ele joga o usuário diretamente em um modo "Morte Súbita" onde o conhecimento e a rapidez são essenciais.

O banco de dados conta com mais de 250 países e territórios, garantindo que as partidas sejam sempre diferentes umas das outras.

## 🎮 Funcionalidades Principais

*Modo Sobrevivência (Morte Súbita): Não existem vidas extras. Se você errar uma única bandeira ou o tempo acabar, o jogo termina imediatamente.*

*Banco de Dados Completo: O jogo utiliza a API REST Countries para buscar, em tempo real, todas as bandeiras do planeta, incluindo ilhas remotas e territórios pouco conhecidos.*

*Aleatoriedade Total: A cada nova partida, a ordem dos países é completamente embaralhada. Você nunca jogará a mesma sequência duas vezes.*

*Cronômetro de Pressão: O jogador tem apenas 10 segundos para responder cada questão. Uma barra de tempo visual indica a urgência.*

*Sistema de Ranking: As 5 melhores pontuações ficam salvas no navegador do usuário, criando um histórico de recordes pessoais.*

*Interface Responsiva: O layout se adapta perfeitamente a computadores, tablets e celulares (design mobile-first).*

## 🕹️ Como Jogar

*1. Abra o jogo e clique em "COMEÇAR O CAOS".*

*2. Uma bandeira será exibida no centro da tela.*

*3. Você terá 6 opções de países para escolher.*

*4. Selecione a resposta correta antes que a barra de tempo (10 segundos) se esgote.*

*5. Acerto: Você ganha 10 pontos e avança imediatamente para a próxima bandeira.*

*6. Erro: O jogo termina e sua pontuação é registrada no Ranking.*

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando apenas as linguagens fundamentais da web, sem o uso de frameworks pesados, garantindo máxima performance:

HTML5: Para a estrutura semântica da página.

CSS3: Para estilização, animações, layout responsivo e efeitos visuais (Glassmorphism).

JavaScript (ES6+): Para toda a lógica do jogo, controle de tempo, manipulação do DOM e consumo da API.

API Externa: REST Countries (Fonte dos dados).

## 🚀 Como Executar o Projeto

Este é um projeto estático, o que significa que não requer instalação de servidores ou bancos de dados complexos.

Baixe os arquivos do projeto (ou clone o repositório).

Certifique-se de que os arquivos index.html, style.css e script.js estão na mesma pasta.

Dê um duplo clique no arquivo index.html.

O jogo abrirá automaticamente no seu navegador padrão.

Nota: É necessário estar conectado à internet para jogar, pois o jogo baixa as bandeiras e nomes dos países no momento em que é iniciado.

## 🤝 Autor

Projeto desenvolvido para fins de estudo e portfólio, demonstrando habilidades em lógica de programação e front-end.
