import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { mainError } = state

  return (
    <div role="errors" className="errorWrap">
      {mainError && <p role="error-content" className="error">{mainError}</p>}
    </div>
  )
}

export default FormStatus
