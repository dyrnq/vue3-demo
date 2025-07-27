import mock from 'mockjs'
import { defineMockData } from 'vite-plugin-mock-dev-server'

interface PageData {
    total: number,
    code: number,
    description: string,
    data: User[],
}

interface User {
  id: number,
  account: string,
  username: string,
  age: number,
  email: string,
}
const total = 100;
export default defineMockData<PageData>('users', {
  total: total,
  code: 200,
  description: 'Success',
  data: Array.from({ length: total }, () => ({
    //id: mock.mock('@increment()'),
    id: mock.mock('@natural(10000000000, 99999999999)'), // 11位长整型
    account: mock.mock('@id()'),
    username: mock.mock('@first()'),
    // email: mock.mock('@mail()'),
    email: mock.mock('@email()'), 
    age: mock.mock('@integer(18, 60)') // 随机生成18-60岁
  }))
})