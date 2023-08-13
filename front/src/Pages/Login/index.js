import React, { useState } from 'react';


import { ImagemUsuario, ImagemSenha, ToggleButton, Imagemtopo, AjustarInput, Geral, ConteudoForm,  AlertDanger, Form, Container, Input, ButtonSuccess,  ConteudoTitulo} from './styles';


export function Login({statusLogin}){

  const [usuario, setUsuario] = useState({
    user: '',
    senha: ''
  })

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const valorInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value});

  const Login = async e =>{
    e.preventDefault();
    

    await fetch("http://localhost/api-crud-php/login.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({usuario})
    })
    .then((response) => response.json())
    .then((responseJson) => {

      if(responseJson.erro === true){
        setStatus({
          type: 'erro',
          mensagem: responseJson.mensagem,
        });
      
      }else{
      
        setStatus({
          type: 'success',
          mensagem: responseJson.mensagem,
        });
        
        localStorage.setItem('id_usuario', responseJson.id);
        localStorage.setItem('tipo_usuario', responseJson.tipo);
        localStorage.setItem('nome_usuario', responseJson.nome);
        localStorage.setItem('nascimento_usuario', responseJson.nascimento);
        localStorage.setItem('senha_usuario', responseJson.senha);
        localStorage.setItem('cpf_usuario', responseJson.cpf);

        statusLogin(responseJson.tipo);
      }
    }).catch(() => {
      setStatus({
        type: 'erro', 
        mensagem: 'Erro de autenticação!',
      });
    });
  }


  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }
  
    return (
      <Geral>
        
        <Imagemtopo></Imagemtopo>
        <Container>  
          <ConteudoForm>

          <ConteudoTitulo>

          
          </ConteudoTitulo>
          
          {status.type === 'erro'? <AlertDanger> {status.mensagem} </AlertDanger>: ""}

          
            <Form onSubmit={Login}>
              
              <AjustarInput>
                <ImagemUsuario> </ImagemUsuario>

                <Input type="text" name="user"  onChange={valorInput} placeholder = "Usuario"/> <br/><br/>
              </AjustarInput>

              <AjustarInput>
                <ImagemSenha> </ImagemSenha>

                <Input  type={showPassword ? 'text' : 'password'}  showPassword={showPassword} name="senha" onChange={valorInput} placeholder = "Senha" /> <br/><br/>
                
                <ToggleButton type="button"  onClick={handleTogglePassword}>  
                  
                </ToggleButton>
              </AjustarInput>
              
              <ButtonSuccess type="submit"> Login </ButtonSuccess>

            </Form>
          </ConteudoForm>
        </Container>
      </Geral>
    );
}

