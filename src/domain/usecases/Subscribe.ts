import { SubscriberModel } from '../models/SubscriberModel'

export type SubscribeParams = {
  name: string
  email: string
}

export interface Subscribe {
  subscribe (params: SubscribeParams): Promise<SubscriberModel>
}
