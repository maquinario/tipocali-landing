import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const isValid = (): string => {
    return state[`${props.name}Error`] ? 'invalid' : 'valid'
  }

  return (
    <div role={`fieldWrap-${props.name}`} className={`inputWrapper ${`inputWrapper-${props.name}`} ${isValid()}`}>
      <input role={`field-${props.name}`} {...props} onChange={handleChange} />
    </div>
  )
}

export default Input
