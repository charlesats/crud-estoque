import React, { useState, useEffect} from "react";
import { Geral, Tabela, Paginacao, Acoes, CampoMarca, BotaoDireito, BotaoConfirmar, BotaoEsquerdo, TabelaTopo, Titulo, TituloApagar, Pesquisa, NovoProduto ,Lupa, Campo, BotaoEditar, BotaoApagar, CampoApagar, TabelaConteudo, AlertDanger, AlertSucess, ModalEditar, TopoModalEditar, ModalApagar, TopoModalApagar, BotaoSair, CampoEditar, Label, BotaoEnviar, CampoModal, ImagemNome, ImagemMarca, ImagemPrecoCompra, ImagemPrecoVenda, Form, ModalCadastrar, TopoModalCadastrar} from "./style";


function PesquisarProduto(){
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const itemsPerPage = 10;

    const [produto, setProduto] = useState({
        nome: '',
        nome_marca: '',
        preco_compra: '',
        preco_venda: '',
    })

    const [marcas, setMarcas] = useState({
        nome: '',
    })


    const [dataId, setDataId] = useState({
        id: '',
        nome: '',
        id_marca: '',
        nome_marca: '',
        preco_compra: '',
        preco_venda: '',
    });
    
    const valorInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

    const [statusProduto, setStatusProduto] = useState({
        type: '',
        mensagem: ''
    })

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        setStatusProduto({
            type: '',
            mensagem: '',
        });
        }, 5000);
    
        return () => clearTimeout(timeoutId);
    }, [statusProduto]);
    


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

        getProdutos({id: id});
    }

    const cadProduto = async e =>{
        e.preventDefault();
        handleModalCadastro(false);
        
        if(produto.nome == ''){
            setStatusProduto({
                type: 'erro', 
                mensagem: "Produto não cadastrado!",
            })
        }else{
            
            await fetch("http://localhost/api-crud-php/cadastrar_produto.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({produto}),

            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson); 
                if(responseJson.erro){
                    setStatusProduto({
                    type: 'erro',
                    mensagem: responseJson.mensagem,
                    })
                }else{
                    setStatusProduto({
                    type: 'success',
                    mensagem: responseJson.mensagem,
                    })
                }
            }).catch(() => {
                setStatusProduto({
                    type: 'erro', 
                    mensagem: "Produto não cadastrado!",
                });
            });
        }
            getProdutos({ id: null });
        
    }

    const handleEditar = (produtoId, produtoNome, produtoMarca, produtoCompra, produtoVenda) => {
        setDataId({
            id: produtoId,
            nome: produtoNome,
            id_marca: produtoMarca,
            preco_compra: produtoCompra,
            preco_venda: produtoVenda,
        });
        setMostrarModalEditar(true);
    };

    const handleApagar = (produtoId, produtoNome, produtoMarca, produtoCompra, produtoVenda) => {
        setDataId({
            id: produtoId,
            nome: produtoNome,
            nome_marca: produtoMarca,
            preco_compra: produtoCompra,
            preco_venda: produtoVenda,
        });
        setMostrarModalApagar(true);
    };


    const renderItems = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return Object.values(data)
          .sort((a, b) => new Date(b.data_alteracao) - new Date(a.data_alteracao))
          .slice(start, end)
          .map((produto) => (
            <tr key={produto.id}>
                <td> {produto.id} </td>
                <td> {produto.nome} </td>
                <td> {produto.nome_marca} </td>
                <td> {produto.preco_compra} </td>
                <td> {produto.preco_venda} </td>
                <td> {produto.data_alteracao}</td>
                <td>
                    <BotaoEditar
                    onClick={() => handleEditar(produto.id, produto.nome, produto.id_marca, produto.preco_compra, produto.preco_venda)}

                    >
                    {" "}
                    </BotaoEditar>{" "}
            
                    <BotaoApagar
                    onClick={() => handleApagar(produto.id, produto.nome, produto.id_marca, produto.preco_compra, produto.preco_venda)}
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

    const getProdutos = async (requestData) => {
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
        };
    
        fetch("http://localhost/api-crud-php/listar_produtos.php", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            if (Object.values(responseJson.records)[0].erro ){
                setStatusProduto({
                    type: 'erro',
                    mensagem: 'Produto não encontrado!'
                })
            }
            setData(responseJson.records);
        }
        );
    }
    useEffect(() => {
        getProdutos({ id: null });
    }, [])


    const getMarcas = async (requestData) => {
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
        };
    
        fetch("http://localhost/api-crud-php/listar_marcas.php", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            setMarcas(responseJson.records);
        }
        );
    }

    useEffect(() => {
        getMarcas({ id: null });
    }, [])


    const editProduto = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost/api-crud-php/editar_produto.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: dataId.id,
              nome: dataId.nome,
              quantidade: dataId.quantidade,
              id_marca: dataId.id_marca,
              preco_compra: dataId.preco_compra,
              preco_venda: dataId.preco_venda,
            }),
            
          });
      
          const responseJson = await response.json();
      
          if (responseJson.erro) {
            setStatusProduto({
              type: "erro",
              mensagem: responseJson.mensagem,
            });
          } else {
            setStatusProduto({
              type: "success",
              mensagem: responseJson.mensagem,
            });
          }
      
          setMostrarModalEditar(false);
          getProdutos({ id: null });
        } catch (error) {
          setStatusProduto({
            type: "erro",
            mensagem: "Produto não editado com sucesso, tente mais tarde!",
          });
        }

        getProdutos({id: null})
    };

    const delProduto = async e =>{

        e.preventDefault();
        handleModalApagar(false);
    
        
        await fetch("http://localhost/api-crud-php/apagar_produto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: dataId.id
            }),
        
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson); 
            if(responseJson.erro){
                setStatusProduto({
                type: 'erro',
                mensagem: responseJson.mensagem,
                })
            }else{
                setStatusProduto({
                type: 'success',
                mensagem: responseJson.mensagem,
                })
                
                getProdutos({ id: null });
            }
        }).catch(() => {
            setStatusProduto({
                type: 'erro', 
                mensagem: 'Erro na conexão com API!',
            });
        });

        getProdutos({ id: null });
    }




    return(
        <Geral>

            {statusProduto.type === 'erro' ? <AlertDanger> {statusProduto.mensagem} </AlertDanger> : ""}
            {statusProduto.type === 'success' ? <AlertSucess> {statusProduto.mensagem} </AlertSucess> : ""}

            <Tabela>
                <TabelaTopo>
                    <Titulo> Tabela de produtos no sistema </Titulo>
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
                        <th> Marca </th>
                        <th> Preco de Compra </th>
                        <th> Preco de Venda </th>
                        <th> Alteração </th>
                        <th> Ações </th>
                        </tr>
                    </thead>

                    <tbody>{renderItems()}</tbody>
                </TabelaConteudo>
                <Paginacao> {renderPageButtons()} </Paginacao>
            </Tabela>
           
            {mostrarModalApagar === true ? 
                <ModalApagar>
                    <TopoModalApagar></TopoModalApagar>
                    <BotaoSair onClick={() => handleModalApagar(false)}>X</BotaoSair>
                    <TituloApagar> Deseja apagar o produto? </TituloApagar>
                    <Form onSubmit={delProduto}>
                        <CampoModal>
                            <ImagemNome></ImagemNome>
                            <CampoApagar>{ dataId.id }</CampoApagar>
                        </CampoModal>
                        
                        <CampoModal>
                            <ImagemNome></ImagemNome>
                            <CampoApagar>{ dataId.nome }</CampoApagar>
                        </CampoModal>

                        <BotaoConfirmar type="submit">Apagar</BotaoConfirmar>
                    </Form>
                </ModalApagar>
                : ""}


            {mostrarModalCadastro === true ? 

            <ModalCadastrar>
                <TopoModalCadastrar></TopoModalCadastrar>
                <BotaoSair onClick={() => handleModalCadastro(false)}>X</BotaoSair>
                <Form onSubmit={cadProduto}>
                    <CampoModal>
                        <ImagemNome></ImagemNome>
                        <CampoEditar type="text" name="nome" placeholder="Nome" onChange={valorInput}/>
                    </CampoModal>
                    <CampoModal>
                        <ImagemMarca></ImagemMarca>
                            <CampoMarca name="marca" placeholder="Marca" onChange={valorInput}>
                                {/* validar se a pessoa selecionou diferente de null */}
                                <option value={null}>Selecione uma marca</option>
                                {Object.values(marcas).map(marca => <option key={marca.id} value={marca.id}>{marca.nome}</option>)}
                            </CampoMarca>
                    </CampoModal>
                    <CampoModal>
                        <ImagemPrecoCompra></ImagemPrecoCompra>
                        <CampoEditar type="text" name="preco_compra" placeholder="Preço de Compra" onChange={valorInput}/>
                    </CampoModal>
                    <CampoModal>
                        <ImagemPrecoVenda></ImagemPrecoVenda>
                        <CampoEditar type="text" name="preco_venda" placeholder="Preço de Venda" onChange={valorInput}/>
                    </CampoModal>
                    <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                </Form>
            </ModalCadastrar>
            : ""}


            {mostrarModalEditar === true ? 

            <ModalEditar>
                <TopoModalEditar></TopoModalEditar>
                <BotaoSair onClick={() => handleModalEditar(false)}>X</BotaoSair>
                <Form onSubmit={editProduto}>
                <CampoModal>
                    <ImagemNome></ImagemNome>
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
                <CampoModal>
                    <ImagemMarca></ImagemMarca>
                    <CampoMarca name="marca" placeholder="Marca" onChange={(e) => setDataId({ ...dataId, id_marca: e.target.value })}>
                        {/* validar se a pessoa selecionou diferente de null */}
                        <option value={null}> Selecione uma marca </option>
                        {Object.values(marcas).map(marca => <option key={marca.id} value={marca.id}>{marca.nome}</option>)}
                    </CampoMarca>

                </CampoModal>
                <CampoModal>
                    <ImagemPrecoCompra></ImagemPrecoCompra>
                    <CampoEditar
                    type="text"
                    name="preco_compra"
                    placeholder={dataId.preco_compra}
                    onChange={(e) =>
                        setDataId({
                        ...dataId,
                        preco_compra: e.target.value // Update 'preco_compra' property
                        })
                    }
                    />
                </CampoModal>
                <CampoModal>
                    <ImagemPrecoVenda></ImagemPrecoVenda>
                    <CampoEditar
                    type="text"
                    name="preco_venda"
                    placeholder={dataId.preco_venda}
                    onChange={(e) =>
                        setDataId({
                        ...dataId,
                        preco_venda: e.target.value // Update 'preco_venda' property
                        })
                    }
                    />
                </CampoModal>
                <BotaoEnviar type="submit">Salvar</BotaoEnviar>
                </Form>
            </ModalEditar>

            : ""}

        </Geral>
    )
}

export default PesquisarProduto;