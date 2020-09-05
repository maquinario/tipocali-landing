import faker from 'faker'
import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { RemoteSubscribe } from './RemoteSubscribe'
import { HttpPostClientSpy } from '@/data/test/MockHttpClient'

type SutTypes = {
  sut: RemoteSubscribe
  httpPostClientSpy: HttpPostClientSpy
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteSubscribe(url, httpPostClientSpy)

  return { sut, httpPostClientSpy}
}

describe('RemoteSubscribe', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    await sut.subscribe()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
