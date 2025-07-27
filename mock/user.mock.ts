import { createDefineMock } from 'vite-plugin-mock-dev-server'
import path from 'node:path'
import user from './data/user'


const defineAPIMock = createDefineMock((mock) => {
  mock.url = path.join('/api', mock.url)
//   console.log(mock.url);
})

export default defineAPIMock([
  {
    url: '/user/list',
    body: () => user.value,
  },
  {
    url: '/user/:userId',
    body({ params }) {
    const userId: string = params.userId
    for (let i = 0; i < user.value.data.length; i++) {
        if (user.value.data[i].id.toString() === userId) {
            return user.value.data[i]
        }
    }
    return null // 如果没有找到匹配的用户
    },
  },
])

49424692839