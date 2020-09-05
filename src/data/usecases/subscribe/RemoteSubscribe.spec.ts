import faker from 'faker'
import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { RemoteSubscribe } from './RemoteSubscribe'
import { HttpPostClientSpy } from '@/data/test/MockHttpClient'

describe('RemoteSubscribe', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteSubscribe(url, httpPostClientSpy)
    await sut.subscribe()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
