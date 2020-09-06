import React from 'react'

const Subscribe: React.FC = () => {
  return (
    <div className="subscribe">
      <div className="subscribe-container">
        <h1 className="subscribe-title">Workshop - Apaixonados por Caligrafia</h1>
        <h3 className="subscribe-subtitle">Inscreva-se aqui para participar do meu workshop online</h3>
        <div className="subscribe-text">
          <p>Deixe seu nome e e-mail  para garantir sua participação</p>
        </div>
        <form action="#" className="subscribe-form">
          <input type="text" placeholder="Nome" className="form-field field-name"/>
          <input type="email" placeholder="Email" className="form-field field-email"/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Subscribe
