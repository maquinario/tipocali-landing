import React, { useState, useCallback } from 'react'

const Subscribe: React.FC = () => {
  const [loading] = useState<Boolean>(false)
  const [valid] = useState<Boolean>(false)
  const [errorMessage] = useState<string>(null)

  const handleSubmit = useCallback(() => {
    event.preventDefault()
  }, [valid])

  return (
    <div className="subscribe">
      <div className="subscribe-container">
        <h1 className="subscribe-title">
          Workshop - Apaixonados por Caligrafia
        </h1>
        <h3 className="subscribe-subtitle">
          Inscreva-se aqui para participar do meu workshop online
        </h3>
        <div className="subscribe-text">
          <p>Deixe seu nome e e-mail para garantir sua participação</p>
        </div>
        <form onSubmit={handleSubmit} className="subscribe-form">
          <div className="subscribe-fields">
            <input
              type="text"
              placeholder="Nome"
              className="form-field field-name"
            />
            <input
              type="email"
              placeholder="Email"
              className="form-field field-email"
            />
            <div role="errors">
              {errorMessage && <div className="subscribe-errors">{errorMessage}</div>}
            </div>
          </div>
          <button
            role="submit"
            type="submit"
            disabled={!valid}
            className={`submitBtn ${loading && 'loading'}`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Subscribe
