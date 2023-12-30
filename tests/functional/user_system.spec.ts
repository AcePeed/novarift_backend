import { test } from '@japa/runner'
import User from 'App/Models/User'

test('login system', async ({ client }) => {
  var response = await client.get('/user')
  response.assertStatus(401)

  response = await client.put('/user')
  response.assertStatus(400)
  response = await client
    .put('/user')
    .json({ email: 'test', password: 'testtest1', password_confirmation: 'testtest' })
  response.assertStatus(400)
  response.assertBodyContains({
    auth: false,
    error: [
      { field: 'fname' },
      { field: 'lname' },
      { field: 'login' },
      { field: 'email' },
      { field: 'password_confirmation' },
    ],
  })

  response = await client.put('/user').json({
    email: 'test@hello',
    password: 'testtest1',
    lname: 'moha',
    fname: 'Yo',
    password_confirmation: 'testtest1',
  })
  response.assertStatus(400)
  response.assertBodyContains({
    auth: false,
    error: [{ field: 'login' }, { field: 'email' }],
  })

  response = await client.put('/user').json({
    email: 'test@gmail.com',
    password: 'testtest1',
    lname: 'm',
    fname: 'Y',
    login: 'test',
    password_confirmation: 'testtest1',
  })
  response.assertStatus(400)
  response.assertBodyContains({
    auth: false,
    error: [{ field: 'fname' }, { field: 'lname' }, { field: 'login' }, { field: 'email' }],
  })

  const user = await User.findBy('login', 'test2')
  if (user) {
    await user.delete()
  }

  response = await client.put('/user').json({
    email: 'test2@gmail.com',
    password: 'testtest1',
    lname: 'User',
    fname: 'LastName',
    login: 'test2',
    password_confirmation: 'testtest1',
  })
  response.assertStatus(200)
  response.assertBodyContains({
    auth: true,
    error: undefined,
  })

  // ___________________________________________________________________

  response = await client.post('/user') //.json({ email: 'test', password: 'test' })
  response.assertStatus(400)

  response = await client.post('/user').json({ email: 'test2', password: 'test' })
  response.assertStatus(401)
  response.assertBodyContains({ auth: false, error: [{ field: 'email' }, { field: 'password' }] })

  response = await client.post('/user').json({ email: 'test@gmail.com', password: 'test' })
  response.assertStatus(200)
  response.assertBodyContains({ auth: true, error: undefined })

  response = await client.post('/user').json({ email: 'test', password: 'test' })
  response.assertStatus(200)
  response.assertBodyContains({ auth: true, error: undefined })
})
