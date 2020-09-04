import faker from 'faker'
import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { RemoteSubscribe } from './RemoteSubscribe'

describe('RemoteSubscribe', () => {
  test('Should call HttpPostClient with correct url', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = faker.internet.url()
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteSubscribe(url, httpPostClientSpy)
    await sut.subscribe()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
