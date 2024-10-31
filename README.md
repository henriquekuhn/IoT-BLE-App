# ionic_react
Ionic React Studies

## O que é Ionic?

O Ionic é um framework de desenvolvimento de aplicativos móveis que permite criar aplicações híbridas, ou seja, que rodam tanto em Android quanto em iOS a partir de uma única base de código. Ele utiliza tecnologias web como HTML, CSS, e JavaScript (ou Typescript), e com o Ionic React, você pode usar o React como framework JavaScript para a interface e lógica de seus aplicativos.

## Requisitos Básicos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

1- Node.js (versão 16 ou superior) - Download
2- NPM (que já vem com o Node.js) ou Yarn
3- Ionic CLI - para instalar o CLI do Ionic, basta rodar:

```
npm install -g @ionic/cli
```

## Criando seu Primeiro Projeto Ionic com React

1- Iniciar um projeto Ionic com React: Abra seu terminal e execute o seguinte comando para criar um novo projeto com o template em branco:

```
ionic start myApp blank --type=react

```

Esse comando cria um aplicativo chamado myApp com o template "blank", que é o mais simples para iniciarmos. O parâmetro --type=react especifica que o projeto será feito com React.

2- Executar o projeto: Navegue até o diretório do projeto e inicie o servidor de desenvolvimento:

```
cd myApp
ionic serve
```

Isso abrirá seu projeto no navegador com live-reload (ou seja, qualquer alteração no código será refletida automaticamente).