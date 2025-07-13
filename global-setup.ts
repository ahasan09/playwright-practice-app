import { expect, request } from '@playwright/test'
import user from './.auth/user.json'
import fs from 'fs'

async function globalSetup() {
    const authFile = '.auth/user.json'
    const context = await request.newContext()

    const loginResponse = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "hasan@mail.com", "password": "hasan123" } }
    })
    const responseBody = await loginResponse.json();
    const accessToken = responseBody.user.token;

    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken

    const articleResponse = await context.post(`${process.env.CONDUIT_API}/articles`, {
        data: {
            "article": {
                "title": "Global Likes test article title",
                "description": "Global Likes test article about",
                "body": "Global Likes test article description",
                "tagList": []
            }
        },
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    });
    expect(articleResponse.status()).toEqual(201);
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup