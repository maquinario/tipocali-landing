import faker from 'faker'
import axios from 'axios'
import { AxiosHttpClient } from './AxiosHttpClient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('Should call axios with correct UL', async () => {
    const sut = new AxiosHttpClient()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
