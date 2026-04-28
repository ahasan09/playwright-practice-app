import { test as setup } from '@playwright/test';
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async ({ request }) => {
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "hasan@mail.com", "password": "hasan123" } }
    })
    const responseBody = await loginResponse.json();
    const accessToken = responseBody.user.token;

    const storageState = {
        cookies: [],
        origins: [{
            origin: 'https://conduit.bondaracademy.com',
            localStorage: [{ name: 'jwtToken', value: accessToken }]
        }]
    }
    fs.writeFileSync(authFile, JSON.stringify(storageState))

    process.env['ACCESS_TOKEN'] = accessToken
})