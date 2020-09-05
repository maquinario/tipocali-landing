import faker from 'faker'
import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { RemoteSubscribe } from './RemoteSubscribe'
import { HttpPostClientSpy } from '@/data/test/MockHttpClient'
import { mockSubscribe } from '@/domain/test/MockSubscribe'

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
    await sut.subscribe(mockSubscribe())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const subscribeParams = mockSubscribe()
    await sut.subscribe(subscribeParams)
    expect(httpPostClientSpy.body).toEqual(subscribeParams)
  })
})
