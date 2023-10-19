const express = require('express');
const { listarConsultasMedicas, validarSenha, criarConsulta, atualizarConsulta, cancelarConsulta, finalizarConsulta, validarSenhaLaudo, laudo, medico } = require('./controladores/consultas'); 

const rotas = express();


rotas.get('/consultas', validarSenha, listarConsultasMedicas);
rotas.get('/consulta/laudo', validarSenhaLaudo, laudo);
rotas.get('/consultas/medico', medico);  
rotas.post('/consulta', criarConsulta);
rotas.post('/consulta/finalizar', finalizarConsulta);
rotas.put('/consultas/:identificadorConsulta/paciente', atualizarConsulta);  
rotas.delete('/consulta/:identificadorConsulta', cancelarConsulta);

module.exports = rotas;