import React, { useState, useEffect } from 'react'
import { Validation } from '@/presentation/protocols/Validation'
import { Input, Button, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Subscribe } from '@/domain/usecases'

type Props = {
  validation: Validation
  subscribe: Subscribe
}

const SubscribePage: React.FC<Props> = ({ validation, subscribe }: Props) => {
  const [state, setState] = useState({
    loading: false,
    email: '',
    emailError: '',
    name: '',
    nameError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      nameError: validation.validate('name', state.name)
    })
  }, [state.name, state.email])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, loading: true })
    try {
      await subscribe.subscribe({ name: state.name, email: state.email })
    } catch (error) {
      console.log(error)
    }
    setState({ ...state, loading: false })
  }

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
        <Context.Provider value={{ state, setState }}>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <div className="subscribe-fields">
              <Input
                type="text"
                className="form-field field-name"
                name="name"
                value={state.name}
                placeholder="Nome"
              />
              <Input
                type="email"
                className="form-field field-email"
                name="email"
                value={state.email}
                placeholder="Email"
              />
            </div>
            <Button
              role="submit"
              disabled={!!state.emailError || !!state.nameError}
              type="submit"
            >
              Cadastrar
            </Button>
            <FormStatus />
          </form>
        </Context.Provider>
      </div>
    </div>
  )
}

export default SubscribePage
