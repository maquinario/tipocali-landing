import { SubscriberModel } from '../models'

export type SubscribeParams = {
  name: string
  email: string
}

export interface Subscribe {
  subscribe (params: SubscribeParams): Promise<SubscriberModel>
}
