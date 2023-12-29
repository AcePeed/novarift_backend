import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ access: true })
})

test('login system', async ({ client }) => {
  var response = await client.get('/user')
  response.assertStatus(401)

  response = await client.post('/user')
  response.assertStatus(400)
  response = await client.put('/user')
  response.assertBodyContains({ access: true })
  response.assertStatus(400)
})
