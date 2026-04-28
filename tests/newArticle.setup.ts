import { expect, test as setup } from '@playwright/test'

setup('create new article', async ({ request }) => {
    const title = `Test article title ${Date.now()}`
    const articleResponse = await request.post(`${process.env.CONDUIT_API}/articles`, {
        data: {
            "article": {
                "title": title,
                "description": "Test article about",
                "body": "Test article description",
                "tagList": ["test"]
            }
        }
    });
    expect(articleResponse.status()).toEqual(201);
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug
    process.env['SLUGID'] = slugId
})
