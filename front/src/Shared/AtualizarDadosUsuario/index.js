import React, { useState, useEffect} from "react";
import { Geral, Tabela, TabelaTopo, TabelaContent, Titulo,  AlertDanger, AlertSucess, ModalEditar,  CampoEditar, BotaoEnviar, CampoModal, ImagemNome, ImagemCpf, ImagemNascimento, ImagemSenha, Form, CampoNascimento, AlertSenha, TabelaConteudo, ImagemDados} from "./style";

function AlterarDadosUsuario(){

    const [usuario, setUsuario] = useState({
        id: localStorage.getItem('id_usuario'),
        nome: localStorage.getItem('nome_usuario'),
        cpf: localStorage.getItem('cpf_usuario'),
        nascimento: localStorage.getItem('nascimento_usuario'),
        senha: localStorage.getItem('senha_usuario'),
        tipo_usuario: localStorage.getItem('tipo_usuario'),
        confirmar_senha: localStorage.getItem('senha_usuario'), 
    })
    
    const [statusUsuario, setStatusUsuario] = useState({
        type: '',
        mensagem: ''
    })

    const [statusSenha, setStatusSenha] = useState({
        type: '',
        mensagem: ''
    })

    

    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // remove todos os caracteres não numéricos
        cpf = cpf.slice(0, 11); // limita o tamanho do CPF a 11 caracteres
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // insere o primeiro ponto
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // insere o segundo ponto
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // insere o traço
        return cpf;
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setStatusUsuario({
            type: '',
            mensagem: '',
        });
        setStatusSenha({
            type: '',
            mensagem: '',
        });
        }, 5000);
    
        return () => clearTimeout(timeoutId);
    }, [statusUsuario]);

  
    const handleEditar = (usuarioNome, usuarioCpf, usuarioNascimento, usuarioSenha) => {
        setUsuario({
            id: localStorage.getItem('id_usuario'),
            nome: usuarioNome,
            cpf: usuarioCpf,
            nascimento: usuarioNascimento,
            senha: usuarioSenha,
            tipo_usuario: localStorage.getItem('tipo_usuario'),
        });
    };

    const valorInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value});


    async function editUsuario(e) {
        e.preventDefault();

        if(usuario.senha !== usuario.confirmar_senha){
            setStatusSenha({
                type: 'erro', 
                mensagem: 'Senhas Diferentes!',
            });
        }else if(usuario.cpf !== localStorage.getItem('cpf_usuario')){
            localStorage.setItem('cpf_usuario', usuario.cpf);
        }
        else if(usuario.nome !== localStorage.getItem('nome_usuario')){
            localStorage.setItem('nome_usuario', usuario.nome);
        }
        else if(usuario.nascimento !== localStorage.getItem('nascimento_usuario')){
            localStorage.setItem('nascimento_usuario', usuario.nascimento);
        }
        else if(usuario.senha !== localStorage.getItem('senha_usuario')){
            localStorage.setItem('senha_usuario', usuario.senha);
        }else{  
        
            try {
                const response = await fetch("http://localhost/api-crud-php/editar_usuario.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    id: usuario.id,
                    nome: usuario.nome,
                    cpf: usuario.cpf,
                    nascimento: usuario.nascimento,
                    senha: usuario.senha,
                    tipo_usuario: usuario.tipo_usuario,
                    }),
                });
        
            const responseJson = await response.json();
        
            if (responseJson.erro) {
                setStatusUsuario({
                type: "erro",
                mensagem: responseJson.mensagem,
                });
            } else {
                setStatusUsuario({
                type: "success",
                mensagem: responseJson.mensagem,
                });
            }
        
            } catch (error) {
                setStatusUsuario({
                    type: "erro",
                    mensagem: "Usuario não editado com sucesso, tente mais tarde!",
                });
            }
        }
    }

    function handleUsuarioChange(event) {
        const { name, value } = event.target;
        setUsuario((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }

    const getUsuarios = async (requestData) => {
        console.log(usuario)
    }
    useEffect(() => {
        getUsuarios();
    }, [])


    return(
        <Geral>
            {statusUsuario.type === 'erro' ? <AlertDanger> {statusUsuario.mensagem} </AlertDanger> : ""}
            {statusUsuario.type === 'success' ? <AlertSucess> {statusUsuario.mensagem} </AlertSucess> : ""}
            {statusSenha.type === 'erro' ? <AlertSenha> {statusSenha.mensagem} </AlertSenha> : ""}
            
            <Tabela>
                <TabelaTopo>
                    <Titulo> Alterar dados</Titulo>
                </TabelaTopo>
            

                <TabelaConteudo>
                    <TabelaContent>
                        <ImagemDados></ImagemDados>
                    </TabelaContent>

                    <ModalEditar>
                        <Form onSubmit={editUsuario}>
                            
                            <CampoModal>
                                <ImagemNome></ImagemNome>
                                <CampoEditar type="text" name="nome" placeholder={usuario.nome} 
                                onChange={handleUsuarioChange}
                            />
                            </CampoModal>
                    
                            <CampoModal>
                                <ImagemCpf></ImagemCpf>
                                <CampoEditar type="text" name="cpf" placeholder={usuario.cpf} onChange={valorInput} onKeyUp={(e) => { e.target.value = formatarCPF(e.target.value) }} />
                            </CampoModal>

                            <CampoModal>
                                <ImagemNascimento></ImagemNascimento>
                                <CampoEditar type="date" name="nascimento" value={usuario.nascimento} onChange={handleUsuarioChange} />
                            </CampoModal>

                            <CampoModal>
                                <ImagemSenha></ImagemSenha>
                                <CampoEditar type="text" name="senha" placeholder={"Senha"} 
                                onChange={handleUsuarioChange}
                            />
                            </CampoModal>

                            <CampoModal>
                                <ImagemSenha></ImagemSenha>
                                <CampoEditar type="text" name="confirmar_senha" placeholder={"Confirmar senha"} 
                                onChange={handleUsuarioChange}
                            />
                            </CampoModal>

                            <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                        </Form>
                    </ModalEditar>
                </TabelaConteudo>            
            </Tabela>
        </Geral>
    );
}

export default AlterarDadosUsuario;