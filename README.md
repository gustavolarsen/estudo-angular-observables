# Estudo de Angular Observable e Subscribe

Este projeto foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.14.

## Sobre

Este projeto foi desenvolvido com o objetivo de entender a forma de trabalho do angular com requisições assincronas com o backend.

Para isso foi criado um CRUD onde é possível adicionar, editar, listar e excluir músicas de um banco de dados fitício.

Este projeto também serviu para praticar a implemetação de testes unitários comoo Karma. Foram criados cenários para o componente `music.component` e para service `music.service`

O foco desse trabalho em nenhum momento foi o design visual, por isso foi criada uma interface extremamente simples com [Bootstrap 5](https://getbootstrap.com/).

### Pré-requisitos

Ter um ambiente que seja possuvel executar Node e Angular

## Como rodar o projeto

Após clonar o projeto deve ser executado no terminal, na pasta do projeto, o seguinte comando:

    $ npm install

Após a instalação das dependências, rode o comando abaixo

    $ ng serve

Com este comando a aplicação irá rodar no ambiente de desenvolvimento apontando para a URL `http://localhost:4200/`.

## Executando testes unitários unit tests

Rode o comando `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

# Acesso a API

Para que o sistema funcione corretamente você irá precisar da API utilziada no projeto rodando localmente.

A Api pode ser clonada nesse repositório XXXX
