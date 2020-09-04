import { SubscriberModel } from '../models/SubscriberModel'

type SubscribeParams = {
  name: string
  email: string
}

export interface Subscribe {
  subscribe (params: SubscribeParams): Promise<SubscriberModel>
}
