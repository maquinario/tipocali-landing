import faker from 'faker';
import {SubscribeParams} from '@/domain/usecases/Subscribe';

export const mockSubscribe = (): SubscribeParams => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email()
})
