import faker from 'faker'
import { HttpPostClient } from '../../protocols/http/HttpPostClient'
import { RemoteSubscribe } from './RemoteSubscribe'
import { HttpPostClientSpy } from '@/data/test/MockHttpClient'
import { mockSubscribe } from '@/domain/test/MockSubscribe'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'

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
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.subscribe(mockSubscribe())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.subscribe(mockSubscribe())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw ServerError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.subscribe(mockSubscribe())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
