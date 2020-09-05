import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'
import { SubscribeParams } from '@/domain/usecases/Subscribe'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { SubscriberModel } from '@/domain/models/SubscriberModel'

export class RemoteSubscribe {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<SubscribeParams, SubscriberModel>
  ) {}

  async subscribe (params: SubscribeParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch(httpResponse.statusCode){
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
  }
}
