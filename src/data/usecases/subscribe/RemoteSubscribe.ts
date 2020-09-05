import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'
import { SubscribeParams } from '@/domain/usecases/Subscribe'

export class RemoteSubscribe {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async subscribe (params: SubscribeParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
