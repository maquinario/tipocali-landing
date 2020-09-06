import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { SubscribeParams, Subscribe } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'
import { SubscriberModel } from '@/domain/models'

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
