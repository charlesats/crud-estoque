import React, { useState, useEffect} from "react";
import { Geral, Tabela, Paginacao, CampoMarca, BotaoDireito, BotaoConfirmar, BotaoEsquerdo, TabelaTopo, Titulo, TituloApagar, Pesquisa, NovoProduto ,Lupa, Campo, BotaoEditar, BotaoApagar, CampoApagar, TabelaConteudo, AlertDanger, AlertSucess, ModalEditar, TopoModalEditar, ModalApagar, TopoModalApagar, BotaoSair, CampoEditar, Label, BotaoEnviar, CampoModal, ImagemNome, ImagemMarca, ImagemPrecoCompra, ImagemPrecoVenda, Form, ModalCadastrar, TopoModalCadastrar} from "./style";


function PesquisarMarca(){
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const itemsPerPage = 10;

    const [marca, setMarca] = useState({
        nome: '',
    })


    const [dataId, setDataId] = useState({
        nome: '',
    });

    const [statusMarca, setStatusMarca] = useState({
        type: '',
        mensagem: ''
    })

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setStatusMarca({
            type: '',
            mensagem: '',
        });
        }, 5000);
    
        return () => clearTimeout(timeoutId);
    }, [statusMarca]);


    const renderItems = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return Object.values(data)
          .sort((a, b) => new Date(b.data_alteracao) - new Date(a.data_alteracao))
          .slice(start, end)
          .map((marca) => (
            <tr key={marca.id}>
                <td> {marca.id} </td>
                <td> {marca.nome} </td>
                <td></td>
                <td>
                    <BotaoEditar onClick={() => handleEditar(marca.id, marca.nome)}>
                    {" "}
                    </BotaoEditar>{" "}
                    <BotaoApagar onClick={() => handleApagar(marca.id, marca.nome)}>
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

        const getMarcas = async (requestData) => {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
            };
        
            fetch("http://localhost/api-crud-php/listar_marcas.php", requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                if (Object.values(responseJson.records)[0].erro ){
                    setStatusMarca({
                        type: 'erro',
                        mensagem: 'Marca não encontrada!'
                    })
                }
                setData(responseJson.records);
            }
            );
        }
        useEffect(() => {
            getMarcas({ id: null });
        }, [])


        const valorInput = e => setMarca({ ...marca, [e.target.name]: e.target.value});
        
        const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
        const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
        const [mostrarModalApagar, setMostrarModalApagar] = useState(false);

        const handleModalCadastro = (bool) => {
            setMostrarModalCadastro(bool);
        }
    
        const handleModalEditar = (bool) => {
            setMostrarModalEditar(bool);
        }
    
        const handleModalApagar = (bool) => {
            setMostrarModalApagar(bool);
        }

        const handlePesquisa = () => {

            const pesquisaInput = document.getElementById("pesquisaInput");
            const id = pesquisaInput.value ? pesquisaInput.value : null;
    
            getMarcas({id: id});
        }

        const handleEditar = (marcaId, marcaNome) => {
            setDataId({
                id: marcaId,
                nome: marcaNome,
            });
            setMostrarModalEditar(true);
        };
    
        const handleApagar = (marcaId, marcaNome) => {
            setDataId({
                id: marcaId,
                nome: marcaNome,
            });
            setMostrarModalApagar(true);
        };
    

        const cadMarca = async e =>{
    
            e.preventDefault();
            handleModalCadastro(false);
            
            if(marca.nome == ''){
                setStatusMarca({
                    type: 'erro', 
                    mensagem: "Marca não cadastrada!",
                })
            }else{

                await fetch("http://localhost/api-crud-php/cadastrar_marcas.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({marca}),
        
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson); 
                    if(responseJson.erro){
                        setStatusMarca({
                        type: 'erro',
                        mensagem: responseJson.mensagem,
                        })
                    }else{
                        setStatusMarca({
                        type: 'success',
                        mensagem: responseJson.mensagem,
                        })
                    }
                }).catch(() => {
                    setStatusMarca({
                        type: 'erro', 
                        mensagem: 'Erro na conexão com API!',
                    });
                });
            }
            getMarcas({ id: null });
        }

        const delMarca = async e =>{
    
            e.preventDefault();
            handleModalApagar(false);
    
            
            await fetch("http://localhost/api-crud-php/apagar_marca.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: dataId.id,
                }),
            
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson); 
                if(responseJson.erro){
                    setStatusMarca({
                    type: 'erro',
                    mensagem: responseJson.mensagem,
                    })
                }else{
                    setStatusMarca({
                    type: 'success',
                    mensagem: responseJson.mensagem,
                    })
                }
            }).catch(() => {
                setStatusMarca({
                    type: 'erro', 
                    mensagem: 'Erro na conexão com API!',
                });
            });
    
            getMarcas({ id: null });
        }

        const editMarca = async (e) => {
            e.preventDefault();
            try {
              const response = await fetch("http://localhost/api-crud-php/editar_marca.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: dataId.id,
                  nome: dataId.nome,
                }),
                
              });
          
              const responseJson = await response.json();
          
              if (responseJson.erro) {
                setStatusMarca({
                  type: "erro",
                  mensagem: responseJson.mensagem,
                });
              } else {
                setStatusMarca({
                  type: "success",
                  mensagem: responseJson.mensagem,
                });
              }
          
              setMostrarModalEditar(false);
              getMarcas({ id: null });
            } catch (error) {
              setStatusMarca({
                type: "erro",
                mensagem: "Marca não editada com sucesso, tente mais tarde!",
              });
            }
    
            getMarcas({id: null})
        };
        
    return(
        <Geral>
            <Tabela>
                {statusMarca.type === 'erro' ? <AlertDanger> {statusMarca.mensagem} </AlertDanger> : ""}
                {statusMarca.type === 'success' ? <AlertSucess> {statusMarca.mensagem} </AlertSucess> : ""}

                <TabelaTopo>
                    <Titulo> Tabela de marcas no sistema </Titulo>
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
                        <th></th>
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
                <Form onSubmit={cadMarca}>
                    <CampoModal>
                        <ImagemMarca></ImagemMarca>
                        <CampoEditar type="text" name="nome" placeholder="Nome" onChange={valorInput}/>
                    </CampoModal>
                    <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                </Form>
            </ModalCadastrar>
            : ""}

            {mostrarModalApagar === true ? 
                <ModalApagar>
                    <TopoModalApagar></TopoModalApagar>
                    <BotaoSair onClick={() => handleModalApagar(false)}>X</BotaoSair>
                    <TituloApagar> Deseja apagar a marca? </TituloApagar>
                    <Form onSubmit={delMarca}>
                        <CampoModal>
                            <ImagemMarca></ImagemMarca>
                            <CampoApagar>{ dataId.nome }</CampoApagar>
                        </CampoModal>

                        <BotaoConfirmar type="submit">Apagar</BotaoConfirmar>
                    </Form>
                </ModalApagar>
                : ""}

            {mostrarModalEditar === true ? 

                <ModalEditar>
                    <TopoModalEditar></TopoModalEditar>
                    <BotaoSair onClick={() => handleModalEditar(false)}>X</BotaoSair>
                    <Form onSubmit={editMarca}>
                    <CampoModal>
                        <ImagemMarca></ImagemMarca>
                        <CampoEditar
                        type="text"
                        name="nome"
                        placeholder={dataId.nome}
                        onChange={(e) =>
                            setDataId({
                            ...dataId,
                            nome: e.target.value // Update 'nome' property
                            })
                        }
                        />
                    </CampoModal>
                   
                    <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                    </Form>
                </ModalEditar>

                : ""}
            
        </Geral>
    );
}

export default PesquisarMarca;