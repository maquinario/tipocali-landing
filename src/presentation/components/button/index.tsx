/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

interface Props
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  children: string
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  const { state } = useContext(Context)
  return (
    <button {...rest} className={`submitBtn ${state.loading && 'loading'}`}>
      {children}
    </button>
  )
}

export default Button
