import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'
import { SubscribeParams, Subscribe } from '@/domain/usecases/Subscribe'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { SubscriberModel } from '@/domain/models/SubscriberModel'

export class RemoteSubscribe implements Subscribe {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<SubscribeParams, SubscriberModel>
  ) {}

  async subscribe (params: SubscribeParams): Promise<SubscriberModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch(httpResponse.statusCode){
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
