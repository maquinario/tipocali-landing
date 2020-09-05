import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'

export class RemoteSubscribe {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async subscribe (): Promise<void> {
    await this.httpPostClient.post({
      url: this.url
    })
  }
}
