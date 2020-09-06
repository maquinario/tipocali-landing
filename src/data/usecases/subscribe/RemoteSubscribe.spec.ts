import faker from 'faker'
import { RemoteSubscribe } from './RemoteSubscribe'
import { HttpPostClientSpy } from '@/data/test'
import { mockSubscribe } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SubscribeParams } from '@/domain/usecases'
import { SubscriberModel } from '@/domain/models'

type SutTypes = {
  sut: RemoteSubscribe
  httpPostClientSpy: HttpPostClientSpy<SubscribeParams, SubscriberModel>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<SubscribeParams, SubscriberModel>()
  const sut = new RemoteSubscribe(url, httpPostClientSpy)

  return { sut, httpPostClientSpy }
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
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.subscribe(mockSubscribe())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw ServerError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.subscribe(mockSubscribe())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should return a SubscriberModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockSubscribe()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.subscribe(mockSubscribe())
    expect(account).toEqual(httpResult)
  })
})
