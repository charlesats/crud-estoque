import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../Login';
import { HomeGerente } from '../HomeGerente';
import { HomeFuncionario } from '../HomeFuncionario';

function App() {
  const [statusLogin, setStatusLogin] = useState(localStorage.getItem('statusLogin'));

  const handleStatusLoginChange = (newStatusLogin) => {
    localStorage.setItem('statusLogin', newStatusLogin);
    setStatusLogin(newStatusLogin);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem('statusLogin');
  
      setStatusLogin(null);
    }, 5 * 60 * 1000); // 5 minutos em milissegundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            statusLogin == 1 ? (
              <HomeGerente statusLogin={handleStatusLoginChange} />
            ) : statusLogin == 2 ? (
              <HomeFuncionario statusLogin={handleStatusLoginChange}/>
            ) : (
              <Login statusLogin={handleStatusLoginChange} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
