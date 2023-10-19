# API REST Consutório Médico

Este projeto foi desenvolvido como desafio alternativo do Módulo 2 do Curso Desenvolvimento de Software com foco em BackEnd pela Cubos Academy e visa fornecer uma experiência prática na criação de um sistema de consultório médico.

## Funcionalidades

- **Listar uma consulta médica:** Será possível exibir todas as consultas cadastradas no consultório

- **Criar consulta médica:**  Pode criar uma consulta médica passando informações do paciente e irá gerar um identificador automaticamente.

- **Atualizar os dados de uma consulta:** É possível realizar alterações nos dados do paciente cadastrado anteriormente.

- **Excluir uma consulta médica:** Cancela uma consulta que foi cadastrada.

- **Finalizar uma consulta médica:** Finaliza uma consulta quando a mesma for atendida.

- **Listar o laudo de uma consulta:** Retorna informações do laudo de uma consulta.

- **Listar as consultas que um médico atendeu:** É possível exibir todas as consultas que um médico já atendeu.

## Quais tecnologias foram utilizadas?

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)



## Como Posso Usar?


1. Faça o fork desse repositório para o seu GitHub

2. Clone o seu repositório em sua máquina

3. Instale as dependências do projeto através do comando:

```bash
npm i
```

4. Execute o projeto com o seguinte comando:

```bash
npm run dev
```

Você poderá utilizar o INSOMNIA para executar e acessar através de http://localhost:3000.



## Resultado com imagens
<br>
<br>


✔️ **CRIAR CONSULTAS**
<br>
Para criar uma consulta, deveremos informar alguns dados da consulta e do paciente que irá gerar um id automaticamente como mostrado abaixo:

```
http://localhost:3000/consulta?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022
```
<a href="/img/Criar consulta.png"><img src="/img/Criar consulta.png" title="CRIAR CONSULTA" /></a>
<br>
<br>

✔️ **LISTAR CONSULTAS**
<br>
Mostra todas as consultas cadastradas
```sql
http://localhost:3000/consulta?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022
```
<a href="/img/listar consulta.png"><img src="/img/listar consulta.png" title="LISTAR CONSULTA" /></a>
<br>
<br>

✔️ **FINALIZAR CONSULTAS**
<br>
Altera as consultas em andamento como finalizada:

```sql
http://localhost:3000/consulta?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022
```
<a href="/img/finalizar consulta.png"><img src="/img/finalizar consulta.png" title="finalizar consulta" /></a>
<br>
<br>

✔️ **ATUALIZAR CONSULTAS**
<br>
Para atualizar uma consulta é necessário passar o ID da consulta que será atualizada.
```
http://localhost:3000/consultas/3/paciente?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022
```
<a href="/img/atualizar consulta.png"><img src="/img/atualizar consulta.png" title="atualizar consulta" /></a>
<br>
<br>

✔️ **DELETAR CONSULTAS**
<br>
Para cancelar uma consulta basta passar o ID da consulta que deseja excluir como parametro na rota.
```
http://localhost:3000/consulta/1?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022
```
<a href="/img/deletar consulta.png"><img src="/img/deletar consulta.png" title="DELETAR CONSULTA" /></a>

Esta consultá só poderá ser excuída se não estiver sido finalizada:
<a href="/img/deletar consulta 2.png"><img src="/img/deletar consulta 2.png" title="DELETAR CONSULTA" /></a>
<br>
<br>

✔️ **MOSTRAR LAUDO**
<br>
Para exibir o laudo será necessário informar o id da consulta e a senha do paciente.
```
http://localhost:3000/consulta/laudo?identificador_consulta=1&senha=1234
```
<a href="/img/laudo.png"><img src="/img/laudo.png" title="LAUDO" /></a>
<br>
<br>


✔️ **LISTAR MEDICOS**
<br>
Aqui será necessário informar o id do médico para conseguir visualizar todas as consultas que o médico já atendeu, ou seja, já foram finalizadas.
```
http://localhost:3000/consultas/medico?identificador_medico=1
```
<a href="/img/medicos.png"><img src="/img/medicos.png" title="MEDICOS" /></a>
<br>
<br>