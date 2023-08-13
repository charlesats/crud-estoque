import React, { useState, useEffect } from "react";
import { Geral, Tabela, Paginacao, BotaoDireito, BotaoEsquerdo, TabelaTopo, Titulo, Pesquisa, Lupa, Campo, BotaoEditar, TabelaConteudo, AlertDanger, AlertSucess, ModalEditar, TopoModalEditar, BotaoSair, CampoEditar, Label, BotaoEnviar, CampoModal, ImagemNome, ImagemQuantidade, Form} from "./style";


function AtualizarEstoque(){
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const [data, setData] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [dataId, setDataId] = useState({
        id: '',
        quantidade: ''
    });

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
              <td> {produto.quantidade} </td>
              <td> {produto.data_alteracao} </td>
              <td>
                <BotaoEditar
                  onClick={() => handleEditar(produto.id, produto.quantidade)}
                >
                  {" "}
                </BotaoEditar>{" "}
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
                if (Object.values(responseJson.records)[0].erro){
                    setStatus({
                        type: 'error',
                        message: 'Produto não encontrado!'
                    })
                }
                setData(responseJson.records);
            }
            );
        }
        
        const handlePesquisa = () => {
            const pesquisaInput = document.getElementById("pesquisaInput");
            const id = pesquisaInput.value ? pesquisaInput.value : null;
        
            getProdutos({id: id});
        }
        
        const handleEditar = (produtoId, produtoQuantidade) => {
            setDataId({
                id: produtoId,
                quantidade: produtoQuantidade
            });
            setMostrarModal(true);
        };

        const handleModal = () => {
            setMostrarModal(false);
        }

        useEffect(() => {
            getProdutos({ id: null });
        }, [])

        useEffect(() => {
            const timeoutId = setTimeout(() => {
            setStatus({
                type: '',
                message: ''
            });
            }, 5000);
        
            return () => clearTimeout(timeoutId);
        }, [status]);
        

        const editQuantidade = async e => {
            e.preventDefault();
            
            await fetch("http://localhost/api-crud-php/editar_estoque.php",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id: dataId.id, quantidade: dataId.quantidade})
            }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              if(responseJson.erro){
                // setStatus({
                //   type: 'error',
                //   message: responseJson.message
                // })
              }else{
                // setStatus({
                //   type: 'success',
                //   message: responseJson.message
                // })
              }
            }).catch(() => {
                //setStatus({
                //type: 'error',
                //message: 'Produto não editado com sucesso, tente mais tarde!'
                //   })
            });
            setMostrarModal(false);
            setStatus({
                type: 'success',
                message: 'Produto editado!' 
            })
            getProdutos({id: null});
          }
        

    return(
        
        <Geral>
            
            {status.type === 'error' ? <AlertDanger> {status.message} </AlertDanger> : ""}
            {status.type === 'success' ? <AlertSucess> {status.message} </AlertSucess> : ""}
           

            <Tabela>
                <TabelaTopo>
                    <Titulo> Tabela de produtos no estoque </Titulo>
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
                        <th> Quantidade </th>
                        <th> Alteração </th>
                        <th> Ações </th>
                        </tr>
                    </thead>

                    <tbody>{renderItems()}</tbody>
                    </TabelaConteudo>

                    <Paginacao>{renderPageButtons()}</Paginacao>
            </Tabela>

            {mostrarModal === true ? 

            <ModalEditar>
                <TopoModalEditar></TopoModalEditar>
                <BotaoSair onClick={() => handleModal()}>X</BotaoSair>
                <Form  onSubmit={editQuantidade}>
                    <CampoModal>
                        <ImagemNome></ImagemNome>
                        <Label>{ dataId.id }</Label>
                    </CampoModal>
                    <CampoModal>
                        <ImagemQuantidade></ImagemQuantidade>
                        <CampoEditar 
                            placeholder={dataId.quantidade}
                            onChange={(e) =>
                                setDataId({
                                ...dataId,
                                quantidade: e.target.value
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

export default AtualizarEstoque;
