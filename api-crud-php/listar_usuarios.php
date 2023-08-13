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
    $query_usuario = "SELECT id, nome, cpf, nascimento FROM usuarios WHERE id=:id AND tipo_usuario=:tipo_usuario";
    $result_usuario = $conn -> prepare($query_usuario);

    $result_usuario -> bindParam(':id', $dados['id'], PDO::PARAM_INT);
    $result_usuario -> bindParam(':tipo_usuario', $dados['tipo_usuario'], PDO::PARAM_INT);
    $result_usuario -> execute();


    if(($result_usuario) AND ($result_usuario -> rowCount() != 0)){
        while($row_ususario = $result_usuario -> fetch(PDO::FETCH_ASSOC)){
            extract($row_ususario);
            
            $lista_usuario["records"][$id] = [
                'id' => $id,
                'nome' => $nome,
                'cpf' => $cpf,
                'nascimento' => $nascimento,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os usuario em formato json
        echo json_encode($lista_usuario);
    }else{
        $query_usuario = "SELECT id, nome, cpf, nascimento FROM usuarios WHERE tipo_usuario=:tipo_usuario ORDER BY id DESC ";
        $result_usuario = $conn -> prepare($query_usuario);
        $result_usuario -> bindParam(':tipo_usuario', $dados['tipo_usuario'], PDO::PARAM_INT);
        $result_usuario -> execute();
        
        if(($result_usuario) AND ($result_usuario -> rowCount() != 0)){
            while($row_ususario = $result_usuario -> fetch(PDO::FETCH_ASSOC)){
                extract($row_ususario);
        
                $lista_usuario["records"][$id] = [
                    'id' => $id,
                    'nome' => $nome,
                    'cpf' => $cpf,
                    'nascimento' => $nascimento,
                    'erro' => true
                ];
            }
        
            // Resposta com status 200
            http_response_code(200);
        
            // Retornar os usuario em formato json
            echo json_encode($lista_usuario);
        }
    }
}else{
    $query_usuario = "SELECT id, nome, cpf, nascimento FROM usuarios WHERE tipo_usuario=:tipo_usuario ORDER BY id DESC ";
    $result_usuario = $conn -> prepare($query_usuario);
    $result_usuario -> bindParam(':tipo_usuario', $dados['tipo_usuario'], PDO::PARAM_INT);
    $result_usuario -> execute();
    
    if(($result_usuario) AND ($result_usuario -> rowCount() != 0)){
        while($row_ususario = $result_usuario -> fetch(PDO::FETCH_ASSOC)){
            extract($row_ususario);
    
            $lista_usuario["records"][$id] = [
                'id' => $id,
                'nome' => $nome,
                'cpf' => $cpf,
                'nascimento' => $nascimento,
                'erro' => false
            ];
        }
    
        // Resposta com status 200
        http_response_code(200);
    
        // Retornar os usuario em formato json
        echo json_encode($lista_usuario);
    }
}