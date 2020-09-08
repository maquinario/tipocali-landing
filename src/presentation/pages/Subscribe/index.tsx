import React, { useState, useCallback, useEffect } from 'react'
import { Validation } from '@/presentation/protocols/Validation'

type Props = {
  validation: Validation
}

const Subscribe: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    loading: false,
    touched: false,
    name: null,
    validName: false,
    email: null,
    validEmail: false,
    errorMessage: null
  })

  const handleSubmit = useCallback(() => {
    event.preventDefault()
  }, [])

  const handleInputChange = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }, [])

  useEffect(() => {
    setState({
      ...state,
      validName: !validation.validate('name', state.name)
    })
  }, [state.name])

  useEffect(() => {
    setState({
      ...state,
      validEmail: !validation.validate('email', state.email)
    })
  }, [state.email])

  useEffect(() => {
    if (state.email || state.name) {
      const updatedError = (!state.validEmail || !state.validName) ? 'Preencha os campos corretamente' : null
      setState({
        ...state,
        errorMessage: updatedError
      })
    }
  }, [state.validEmail, state.validName])

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
              name="name"
              placeholder="Nome"
              className={`form-field field-name ${!state.validName ? 'invalid' : 'valid'}`}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`form-field field-email ${!state.validEmail && 'invalid'}`}
              onChange={handleInputChange}
            />
            <div role="errors">
              {state.errorMessage && <div className="subscribe-errors">{state.errorMessage}</div>}
            </div>
          </div>
          <button
            role="submit"
            type="submit"
            disabled={!state.validEmail && !state.validName}
            className={`submitBtn ${state.loading && 'loading'}`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Subscribe
