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
    $query_marcas = "SELECT id, nome_marca, data_alteracao FROM marcas WHERE id=:id AND nome_marca != 'Marca Deletada' ";
    $result_marcas = $conn -> prepare($query_marcas);

    $result_marcas -> bindParam(':id', $dados['id'], PDO::PARAM_INT);
    $result_marcas -> execute();


    if(($result_marcas) AND ($result_marcas -> rowCount() != 0)){
        while($row_produto = $result_marcas -> fetch(PDO::FETCH_ASSOC)){
            extract($row_produto);
            
            $lista_marcas["records"][$id] = [
                'id' => $id,
                'nome' => $nome_marca,
                'data_alteracao' => $data_alteracao,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os marcas em formato json
        echo json_encode($lista_marcas);
    }else{
        $query_marcas = "SELECT id, nome_marca, data_alteracao FROM marcas WHERE nome_marca != 'Marca Deletada' ORDER BY data_alteracao DESC";
        $result_marcas = $conn -> prepare($query_marcas);
        $result_marcas -> execute();
        
        if(($result_marcas) AND ($result_marcas -> rowCount() != 0)){
            while($row_produto = $result_marcas -> fetch(PDO::FETCH_ASSOC)){
                extract($row_produto);
        
                $lista_marcas["records"][$id] = [
                    'id' => $id,
                    'nome' => $nome_marca,
                    'data_alteracao' => $data_alteracao,
                    'erro' => true
                ];
            }
        
            // Resposta com status 200
            http_response_code(200);
        
            // Retornar os marcas em formato json
            echo json_encode($lista_marcas);
        }
    }
}else{

    $query_marcas = "SELECT id, nome_marca, data_alteracao FROM marcas WHERE nome_marca != 'Marca Deletada' ORDER BY data_alteracao DESC";
    $result_marcas = $conn -> prepare($query_marcas);
    $result_marcas -> execute();
    
    if(($result_marcas) AND ($result_marcas -> rowCount() != 0)){
        while($row_produto = $result_marcas -> fetch(PDO::FETCH_ASSOC)){
            extract($row_produto);
    
            $lista_marcas["records"][$id] = [
                'id' => $id,
                'nome' => $nome_marca,
                'data_alteracao' => $data_alteracao,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os marcas em formato json
        echo json_encode($lista_marcas);
    }
}
