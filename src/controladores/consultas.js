const bancodedados = require('../bancodedados');
let bancoDeDados = require('../bancodedados');


const listarConsultasMedicas = (req, res) => {
    const qtdconsultas = bancoDeDados.consultas.length;

    if ( qtdconsultas === 0 ) {
        return res.status(204).json();
    }
    if ( qtdconsultas === 1 ) {
        return res.status(200).json( { message: ` ${qtdconsultas} consulta encontrada`, consultas:bancoDeDados.consultas} );
    }
    res.status(200).json({ message: ` ${qtdconsultas} consultas encontradas`, consultas:bancoDeDados.consultas}); 

};



const validarSenha = (req, res, next) => {
    const {senha_consultorio, cnes_consultorio} = req.query;

    if(!senha_consultorio || !cnes_consultorio) {
        return res.status(400).json('O cnes ou a senha não foram informados');        
    };

    if (senha_consultorio !== bancoDeDados.consultorio.senha || cnes_consultorio !== bancoDeDados.consultorio.cnes) {
        return res.status(401).json('Cnes ou senha inválidos!');
    }

    next();
};


const criarConsulta = (req, res) => { 
    const { tipoConsulta, valorConsulta, paciente,} = req.body;
    

    if (!tipoConsulta) {
        return res.status(400).json({ message: ' O tipo da consulta é obrigatório' })
    }
    if (!valorConsulta) {
        return res.status(400).json({ message: ' O valor da consulta é obrigatório' })
    }
    if (valorConsulta && typeof valorConsulta != 'number') {
        return res.status(400).json({ message: ' O valor da consulta deve ser um número' })
    }
    if (!paciente) {
        return res.status(400).json({ message: ' O campo paciente é obrigatório' })
    }

    const { nome, cpf, dataNascimento, celular, email, senha} = paciente;


    if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {  
        return res.status(400).json({ message: ' Todos os dados do paciente são obrigatórios' })
    }
   

    const pacienteExistente = bancoDeDados.consultas.find(consulta => consulta.paciente.cpf === cpf && !consulta.finalizada ); 

    if (pacienteExistente) {
        return res.status(400).json({ message: 'Já existe uma consulta em andamento com o cpf ou e-mail informado!.' });
    }
    
    const medico = bancoDeDados.consultorio.medicos.find(medico => medico.especialidade === tipoConsulta )
    if ( !medico ) {
        return res.status(400).json({ message: 'O tipo da consulta informado não consta na base de dados dos médicos!.' });
    }   
    const consulta = {
        identificador: bancoDeDados.identificadorConsulta++,
        tipoConsulta,
        finalizada: false,
        identificadorMedico: medico.identificador,
        valorConsulta,
        paciente
    }

    bancoDeDados.consultas.push(consulta);

    return res.status(201).send();

};


const atualizarConsulta = (req, res) => {
    const { identificadorConsulta } = req.params;
    const { nome, cpf, dataNascimento, celular, email, senha} = req.body;

    const consulta = bancoDeDados.consultas.find(consulta => consulta.identificador === Number(identificadorConsulta))
    
    if (!consulta) {
        return res.status(404).json({ message: 'O identificador não existe'})
    }

    if (consulta && consulta.finalizada) {
        return res.status(400).json({ message: "A consulta só pode ser atualizada se a mesma não estiver finalizada"})
    }
    
    if (bancoDeDados.consultas.find(consulta => consulta.cpf === cpf)) {
        return res.status(400).json({ message: "Cpf já consta na base!"});
    } 
    if (bancoDeDados.consultas.find(consulta => consulta.email === email)) {
        return res.status(400).json({ message: "email já consta na base!"});
    } 
    
    consulta.paciente = {
        nome,
        cpf,
        dataNascimento,
        celular,
        email,
        senha
    }
    return res.status(204).send(); 
};

const cancelarConsulta = (req, res) => {  
    const { identificadorConsulta } = req.params;

    let consulta = bancoDeDados.consultas.find(consulta => consulta.identificador === Number(identificadorConsulta))
    
    if (!consulta) {
        return res.status(404).json({ message: 'O identificador não existe'})
    }

    if (consulta && consulta.finalizada) {
        return res.status(400).json({ message: "A consulta só pode ser removida se a mesma não estiver finalizada"}) 
    };

    bancodedados.consultas = bancoDeDados.consultas.filter((consulta) => { 
        return consulta.identificador !== Number(identificadorConsulta);
    });

    return res.status(204).send();
};


const finalizarConsulta = (req, res) => { 
    const {identificadorConsulta, textoMedico} = req.body;
    

    if (!identificadorConsulta) {
        return res.status(400).json({ message: ' O identificador é obrigatório' })
    }
    if (!textoMedico) {
        return res.status(400).json({ message: ' O textoMedico é obrigatório' })
    }

    let consulta = bancoDeDados.consultas.find(consulta => consulta.identificador === Number(identificadorConsulta))

    if (!consulta) { 
        return res.status(404).json({ message: 'O identificador não existe'})
    }

    if (consulta && consulta.finalizada) {
        return res.status(400).json({ message: "Essa consulta já está finalizada"}) 
    };


    if (textoMedico < 0 && textoMedico >= 200) {
        return res.status(400).json({ message: "O tamanho do textoMedico não está dentro do esperado"})
    }

    consulta.finalizada = true;

    bancodedados.consultasFinalizadas.push(consulta);

    const laudo = {
        identificador: bancodedados.identificadorLaudo++,
        identificadorConsulta,
        identificadorMedico: consulta.identificadorMedico,
        textoMedico,
        paciente: consulta.paciente
    }
    
    bancodedados.laudos.push(laudo);
    
    return res.status(204).send();
}


const validarSenhaLaudo = (req, res, next) => {
    const {senha, identificador_consulta} = req.query;
    let consulta = bancoDeDados.consultas.find(consulta => consulta.identificador === Number(identificador_consulta))
    if(!senha || !identificador_consulta) {
        return res.status(400).json('O identificador ou a senha não foram informados');        
    };

    if (senha !== consulta.paciente.senha ) {
        return res.status(401).json('Senha inválida!');
    }

    next();
};


const laudo = (req, res) => { 
    const {identificador_consulta} = req.query;
    
    const qtdconsultas = bancoDeDados.consultas.length;

    if ( qtdconsultas === 0 ) {
        return res.status(204).json( { message: "Não há consultas a serem informadas"});
    }
    
    let laudo = bancoDeDados.laudos.find(laudo => laudo.identificadorConsulta === Number(identificador_consulta))
    
    if (!laudo) {
        return res.status(404).json({ message: "O laudo não foi encontrado"})
    }

    return res.status(200).json(laudo);
};


const medico = (req, res) => {
    const {identificador_medico} = req.query;

    if (!identificador_medico) {
        return res.status(400).json({ message: ' O identificador é obrigatório' })
    }

    const medico = bancoDeDados.consultorio.medicos.find(medico => medico.identificador === Number(identificador_medico) );
    const existeMedico = JSON.stringify(medico);
    
    if (!existeMedico) {
        return res.status(404).json({ message: 'O identificador do médico não existe'})
    }
    
    const consultasMedico = bancodedados.consultasFinalizadas.filter( consulta => consulta.identificadorMedico === Number(identificador_medico));

    if ( consultasMedico.length === 0) {
        return res.status(404).json({ mensagem: "O médico informado não existe na base!"})
    }

    return res.status(200).json(consultasMedico);
}


module.exports = {
    listarConsultasMedicas,
    validarSenha,
    criarConsulta,
    atualizarConsulta,
    cancelarConsulta,
    finalizarConsulta, 
    validarSenhaLaudo,
    laudo,
    medico,
}