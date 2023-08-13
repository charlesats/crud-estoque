<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


error_reporting(0);
ini_set('display_errors', 0);

//incluir a conexão
include_once 'conexao.php';


$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados['id'] !== null ){
    $query_produtos = "SELECT p.id, p.nome,  p.id_marca, m.nome_marca, p.quantidade, p.preco_compra, p.preco_venda, p.data_alteracao 
        FROM produtos p 
        JOIN marcas m ON p.id_marca = m.id 
        WHERE p.id=:id
        ORDER BY p.data_alteracao DESC
        ";
    
    $result_produtos = $conn -> prepare($query_produtos);
    $result_produtos -> bindParam(':id', $dados['id'], PDO::PARAM_INT);
   
    $result_produtos -> execute();


    if(($result_produtos) AND ($result_produtos -> rowCount() != 0)){
        while($row_produto = $result_produtos -> fetch(PDO::FETCH_ASSOC)){
            extract($row_produto);
    
            $lista_produtos["records"][$id] = [
                'id' => $id,
                'nome' => $nome,
                'id_marca' => $id_marca,
                'nome_marca' => $nome_marca,
                'quantidade' => $quantidade,
                'preco_compra' => $preco_compra,
                'preco_venda' => $preco_venda,
                'data_alteracao' => $data_alteracao,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os produtos em formato json
        echo json_encode($lista_produtos);
    }else{
        $query_produtos = "SELECT p.id, p.nome, p.id_marca, m.nome_marca, p.quantidade, p.preco_compra, p.preco_venda, p.data_alteracao 
        FROM produtos p 
        JOIN marcas m ON p.id_marca = m.id 
        ORDER BY p.data_alteracao DESC
        ";
        $result_produtos = $conn -> prepare($query_produtos);
        $result_produtos -> execute();


        if(($result_produtos) AND ($result_produtos -> rowCount() != 0)){
            while($row_produto = $result_produtos -> fetch(PDO::FETCH_ASSOC)){
                extract($row_produto);
        
                $lista_produtos["records"][$id] = [
                    'id' => $id,
                    'nome' => $nome,
                    'id_marca' => $id_marca,
                    'nome_marca' => $nome_marca,
                    'quantidade' => $quantidade,
                    'preco_compra' => $preco_compra,
                    'preco_venda' => $preco_venda,
                    'data_alteracao' => $data_alteracao,
                    'erro' => true
                ];
            }
        
            // Resposta com status 200
            http_response_code(200);
        
            // Retornar os produtos em formato json
            echo json_encode($lista_produtos);
        }
    }
}else{

    $query_produtos = "SELECT p.id, p.nome,  p.id_marca, m.nome_marca, p.quantidade, p.preco_compra, p.preco_venda, p.data_alteracao 
        FROM produtos p 
        JOIN marcas m ON p.id_marca = m.id 
        ORDER BY p.data_alteracao DESC
        ";
    $result_produtos = $conn -> prepare($query_produtos);
    $result_produtos -> execute();


    if(($result_produtos) AND ($result_produtos -> rowCount() != 0)){
        while($row_produto = $result_produtos -> fetch(PDO::FETCH_ASSOC)){
            extract($row_produto);
    
            $lista_produtos["records"][$id] = [
                'id' => $id,
                'nome' => $nome,
                'id_marca' => $id_marca,
                'nome_marca' => $nome_marca,
                'quantidade' => $quantidade,
                'preco_compra' => $preco_compra,
                'preco_venda' => $preco_venda,
                'data_alteracao' => $data_alteracao,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os produtos em formato json
        echo json_encode($lista_produtos);
    }
}
