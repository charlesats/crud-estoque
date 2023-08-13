import React, { useState, useEffect} from "react";
import { Geral, Tabela, Paginacao, Acoes, CampoMarca, BotaoDireito, BotaoConfirmar, BotaoEsquerdo, TabelaTopo, Titulo, TituloApagar, Pesquisa, NovoProduto ,Lupa, Campo, BotaoEditar, BotaoApagar, CampoApagar, TabelaConteudo, AlertDanger, AlertSucess, ModalEditar, TopoModalEditar, ModalApagar, TopoModalApagar, BotaoSair, CampoEditar, Label, BotaoEnviar, CampoModal, ImagemNome, ImagemCpf, ImagemNascimento, ImagemSenha, Form, ModalCadastrar, TopoModalCadastrar, CampoNascimento, AlertSenha} from "./style";

function PesquisarFuncionario(){
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const itemsPerPage = 10;

    const [usuario, setUsuario] = useState({
        id: '',
        nome: '',
        cpf: '',
        nascimento: '',
        tipo_usuario: 1
    })

    const [statusUsuario, setStatusUsuario] = useState({
        type: '',
        mensagem: ''
    })

    const [statusSenha, setStatusSenha] = useState({
        type: '',
        mensagem: ''
    })

    const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [mostrarModalApagar, setMostrarModalApagar] = useState(false);

    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // remove todos os caracteres não numéricos
        cpf = cpf.slice(0, 11); // limita o tamanho do CPF a 11 caracteres
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // insere o primeiro ponto
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // insere o segundo ponto
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // insere o traço
        return cpf;
    }

    const handleModalCadastro = (bool) => {
        setMostrarModalCadastro(bool);
    }

    const handleModalEditar = (bool) => {
        setMostrarModalEditar(bool);
    }

    const handleModalApagar = (bool) => {
        setMostrarModalApagar(bool);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setStatusUsuario({
            type: '',
            mensagem: '',
        });
        }, 5000);
    
        return () => clearTimeout(timeoutId);
    }, [statusUsuario]);

    const handlePesquisa = () => {

        const pesquisaInput = document.getElementById("pesquisaInput");
        const id = pesquisaInput.value ? pesquisaInput.value : null;

        getUsuarios({id: id, tipo_usuario: 1});
    }

    const handleEditar = (usuarioId, usuarioNome, usuarioCpf, usuarioNascimento, usuarioSenha) => {
        setUsuario({
            id: usuarioId,
            nome: usuarioNome,
            cpf: usuarioCpf,
            nascimento: usuarioNascimento,
            senha: usuarioSenha,
        });
        setMostrarModalEditar(true);
    };

    const handleApagar = (usuarioId, usuarioNome, usuarioCpf, usuarioNascimento, usuarioSenha) => {
        setUsuario({
            id: usuarioId,
            nome: usuarioNome,
            cpf: usuarioCpf,
            nascimento: usuarioNascimento,
            senha: usuarioSenha,
        });
        setMostrarModalApagar(true);
    };

    const renderItems = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const sortedData = Object.values(data).sort((a, b) => b.id - a.id); // ordena os dados pelo maior ID
        return sortedData.slice(start, end).map((usuario) => (
        
            <tr key={usuario.id}>
                <td> {usuario.id} </td>
                <td> {usuario.nome} </td>
                <td> {usuario.cpf} </td>
                <td> {usuario.nascimento} </td>
                <td>
                     <BotaoEditar
                    onClick={() => handleEditar(usuario.id, usuario.nome, usuario.cpf, usuario.nascimento, usuario.senha)}

                    >
                    {" "}
                    </BotaoEditar>{" "}
            
                    <BotaoApagar
                    onClick={() => handleApagar(usuario.id, usuario.nome, usuario.cpf, usuario.nascimento, usuario.senha)}
                    >
                    {" "}
                    </BotaoApagar>{" "}
              </td>
            </tr>
          ));
      };

    const renderPageButtons = () => {
    const totalPages = Math.ceil(Object.values(data).length / itemsPerPage);
    const pageButtons = [];
    
    if (totalPages === 1 && currentPage !== 1) {
        setCurrentPage(1);
    } else {
        // Botão de página anterior
        if (currentPage > 1) {
        pageButtons.push(
            <BotaoEsquerdo
            key="previous"
            onClick={() => setCurrentPage(currentPage - 1)}
            >
            
            </BotaoEsquerdo>
        );
        }
        
        // Botão de próxima página
        if (currentPage < totalPages) {
        pageButtons.push(
            <BotaoDireito
            key="next"
            onClick={() => setCurrentPage(currentPage + 1)}
            >
            
            </BotaoDireito>
        );
        }
    }
    
    return pageButtons;
    };

    const valorInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value});


    const getUsuarios = async (requestData) => {
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
        };
    
        fetch("http://localhost/api-crud-php/listar_usuarios.php", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            if (Object.values(responseJson.records)[0].erro ){
                setStatusUsuario({
                    type: 'erro',
                    mensagem: 'Usuario não encontrado!'
                })
            }
            setData(responseJson.records);
        }
        );
    }
    useEffect(() => {
        getUsuarios({ id: null, tipo_usuario: 1});
    }, [])

    const cadUsuario = async e =>{
        e.preventDefault();
        
        if(usuario.senha !== usuario.confirmar_senha){
            setStatusSenha({
                type: 'erro', 
                mensagem: 'Senhas Diferentes!',
            });
        }else if(usuario.nome === '' || usuario.cpf === '' || usuario.nascimento === ''){
            setStatusSenha({
                type: 'erro', 
                mensagem: 'Preencha todos os campos!',
            });
        }
        else{
            handleModalCadastro(false);
            
            await fetch("http://localhost/api-crud-php/cadastrar_usuario.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({usuario}),

            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson); 
                if(responseJson.erro){
                    setStatusUsuario({
                    type: 'erro',
                    mensagem: responseJson.mensagem,
                    })
                }else{
                    setStatusUsuario({
                    type: 'success',
                    mensagem: responseJson.mensagem,
                    })
                }
            }).catch(() => {
                setStatusUsuario({
                    type: 'erro', 
                    mensagem: 'Erro na conexão com API!',
                });
            });

            getUsuarios({ id: null, tipo_usuario: 1});
        }
    }

    async function editUsuario(e) {
        e.preventDefault();

        if(usuario.senha !== usuario.confirmar_senha){
            setStatusSenha({
                type: 'erro', 
                mensagem: 'Senhas Diferentes!',
            });
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
                tipo_usuario: 1,
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
        
            setMostrarModalEditar(false);
            getUsuarios({ id: null, tipo_usuario: 1 });
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
    
    const delUsuario = async e =>{

        e.preventDefault();
        handleModalApagar(false);
    
        
        await fetch("http://localhost/api-crud-php/apagar_usuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: usuario.id
            }),
        
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson); 
            if(responseJson.erro){
                setStatusUsuario({
                type: 'erro',
                mensagem: responseJson.mensagem,
                })
            }else{
                setStatusUsuario({
                type: 'success',
                mensagem: responseJson.mensagem,
                })
                
                getUsuarios({ id: null, tipo_usuario: 1 });
            }
        }).catch(() => {
            setStatusUsuario({
                type: 'erro', 
                mensagem: 'Erro na conexão com API!',
            });
        });

        getUsuarios({ id: null, tipo_usuario: 1 });
    }    


    return(
        <Geral>
            {statusUsuario.type === 'erro' ? <AlertDanger> {statusUsuario.mensagem} </AlertDanger> : ""}
            {statusUsuario.type === 'success' ? <AlertSucess> {statusUsuario.mensagem} </AlertSucess> : ""}

            <Tabela>
                <TabelaTopo>
                    <Titulo> Tabela de gerentes no sistema </Titulo>
                    <NovoProduto onClick={() => handleModalCadastro(true)}>+</NovoProduto>
                    <Pesquisa>    
                        <Lupa onClick={handlePesquisa}></Lupa>
                        <Campo placeholder={"Pesquisar id..."} id="pesquisaInput" />                    
                    </Pesquisa>
                </TabelaTopo>

                <TabelaConteudo>
                    <thead>
                        <tr>
                        <th> ID </th>
                        <th> Nome </th>
                        <th> CPF </th>
                        <th> Nascimento </th>
                        <th> Ações </th>
                        </tr>
                    </thead>

                    <tbody>{renderItems()}</tbody>
                </TabelaConteudo>
                <Paginacao> {renderPageButtons()} </Paginacao>
            </Tabela>



            {mostrarModalCadastro === true ? 

            <ModalCadastrar>
                <TopoModalCadastrar></TopoModalCadastrar>
                <BotaoSair onClick={() => handleModalCadastro(false)}>X</BotaoSair>
                
                <Form onSubmit={cadUsuario}>
                    {statusSenha.type === 'erro' ? <AlertSenha> {statusSenha.mensagem} </AlertSenha> : ""}
                    <CampoModal>
                        <ImagemNome></ImagemNome>
                        <CampoEditar type="text" name="nome" placeholder="Nome" onChange={valorInput}/>
                    </CampoModal>
            
                    <CampoModal>
                        <ImagemCpf></ImagemCpf>
                        <CampoEditar type="text" name="cpf" placeholder="CPF" onChange={valorInput} onKeyUp={(e) => { e.target.value = formatarCPF(e.target.value) }} />
                    </CampoModal>

                    <CampoModal>
                        <ImagemNascimento></ImagemNascimento>
                        <CampoNascimento type="date" name="nascimento" placeholder="Nascimento" onChange={valorInput}/>
                    </CampoModal>

                    <CampoModal>
                        <ImagemSenha></ImagemSenha>
                        <CampoEditar type="text" name="senha" placeholder="Senha" onChange={valorInput}/>
                    </CampoModal>

                    <CampoModal>
                        <ImagemSenha></ImagemSenha>
                        <CampoEditar type="text" name="confirmar_senha" placeholder="Confirmar Senha" onChange={valorInput}/>
                    </CampoModal>

                    <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                </Form>
            </ModalCadastrar>
            : ""}    

            {mostrarModalEditar === true ? 

            <ModalEditar>
                <TopoModalEditar></TopoModalEditar>
                <BotaoSair onClick={() => handleModalEditar(false)}>X</BotaoSair>
                <Form onSubmit={editUsuario}>
                    {statusSenha.type === 'erro' ? <AlertSenha> {statusSenha.mensagem} </AlertSenha> : ""}
                    <CampoModal>
                        <ImagemNome></ImagemNome>
                        <CampoEditar type="text" name="nome" placeholder={usuario.nome} 
                        onChange={handleUsuarioChange}
                    />
                    </CampoModal>
            
                    <CampoModal>
                        <ImagemCpf></ImagemCpf>
                        <CampoEditar type="text" name="cpf" placeholder="CPF" onChange={valorInput} onKeyUp={(e) => { e.target.value = formatarCPF(e.target.value) }} />
                    </CampoModal>

                    <CampoModal>
                        <ImagemNascimento></ImagemNascimento>
                        <CampoNascimento type="date" name="nascimento" placeholder={usuario.nascimento} 
                        onChange={handleUsuarioChange}
                    />
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

            : ""}

            {mostrarModalApagar === true ? 
                <ModalApagar>
                    <TopoModalApagar></TopoModalApagar>
                    <BotaoSair onClick={() => handleModalApagar(false)}>X</BotaoSair>
                    <TituloApagar> Deseja apagar o produto? </TituloApagar>
                    <Form onSubmit={delUsuario}>
                        <CampoModal>
                            <ImagemNome></ImagemNome>
                            <CampoApagar>{ usuario.id }</CampoApagar>
                        </CampoModal>
                        
                        <CampoModal>
                            <ImagemNome></ImagemNome>
                            <CampoApagar>{ usuario.nome }</CampoApagar>
                        </CampoModal>

                        <BotaoConfirmar type="submit">Apagar</BotaoConfirmar>
                    </Form>
                </ModalApagar>
                : ""}
            
        </Geral>
    );
}

export default PesquisarFuncionario;