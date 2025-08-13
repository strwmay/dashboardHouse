import React, { useState } from 'react';

function Garage() {
  const [portaSocial, setPortaSocial] = useState('Fechada');
  const [portaBasculante, setPortaBasculante] = useState('Fechada');
  const [luzGaragem, setLuzGaragem] = useState('Desligada');

  return (
    <div>
      <h3>Garagem</h3>
      <div>
        <p>Porta Social: {portaSocial}</p>
        <button className="btn btn-primary" onClick={() => setPortaSocial(portaSocial === 'Fechada' ? 'Aberta' : 'Fechada')}>
          {portaSocial === 'Fechada' ? 'Abrir' : 'Fechar'}
        </button>
      </div>
      <div>
        <p>Porta Basculante: {portaBasculante}</p>
        <button className="btn btn-primary" onClick={() => setPortaBasculante(portaBasculante === 'Fechada' ? 'Aberta' : 'Fechada')}>
          {portaBasculante === 'Fechada' ? 'Abrir' : 'Fechar'}
        </button>
      </div>
      <div>
        <p>Luz da Garagem: {luzGaragem}</p>
        <button className="btn btn-primary" onClick={() => setLuzGaragem(luzGaragem === 'Desligada' ? 'Ligada' : 'Desligada')}>
          {luzGaragem === 'Desligada' ? 'Ligar' : 'Desligar'}
        </button>
      </div>
    </div>
  );
}

export default Garage;
