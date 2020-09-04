import React from 'react'
import SubscribePage from '@/presentation/pages/Subscribe'
import { ValidationComposite, ValidationBuilder } from '@/validation/validators'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { RemoteSubscribe } from '@/data/usecases/subscribe/RemoteSubscribe'

export const makeSubscribe: React.FC = () => {
  const url = 'https://tipocali.herokuapp.com/api/subscribe'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteSubscribe = new RemoteSubscribe(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('name').required().minLength(3).build(),
    ...ValidationBuilder.field('email').required().email().build()
  ])
  return <SubscribePage validation={validationComposite} subscribe={remoteSubscribe} />
}
