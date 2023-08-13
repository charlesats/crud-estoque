<?php

// Cabecalhos obrigatorios

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

error_reporting(0);
ini_set('display_errors', 0);

//incluir a conexão
include_once 'conexao.php';


$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados['id'] !== null ){
    $query_produtos = "SELECT id, nome, id_marca, quantidade, data_alteracao FROM produtos WHERE id=:id";
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
                'quantidade' => $quantidade,
                'data_alteracao' => $data_alteracao,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os produtos em formato json
        echo json_encode($lista_produtos);
    }else{
        $query_produtos = "SELECT id, nome, marca, quantidade, data_alteracao FROM produtos ORDER BY id DESC";
        $result_produtos = $conn -> prepare($query_produtos);
        $result_produtos -> execute();
        
        if(($result_produtos) AND ($result_produtos -> rowCount() != 0)){
            while($row_produto = $result_produtos -> fetch(PDO::FETCH_ASSOC)){
                extract($row_produto);
        
                $lista_produtos["records"][$id] = [
                    'id' => $id,
                    'nome' => $nome,
                    'id_marca' => $id_marca,
                    'quantidade' => $quantidade,
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

    $query_produtos = "SELECT id, nome, id_marca, quantidade, data_alteracao FROM produtos ORDER BY data_alteracao DESC";
    $result_produtos = $conn -> prepare($query_produtos);
    $result_produtos -> execute();
    
    if(($result_produtos) AND ($result_produtos -> rowCount() != 0)){
        while($row_produto = $result_produtos -> fetch(PDO::FETCH_ASSOC)){
            extract($row_produto);
    
            $lista_produtos["records"][$id] = [
                'id' => $id,
                'nome' => $nome,
                'id_marca' => $id_marca,
                'quantidade' => $quantidade,
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
