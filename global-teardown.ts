import { request, expect } from '@playwright/test'

async function globalTeardown() {
    const context = await request.newContext()
    const deletedArticleResponse = await context.delete(`${process.env.CONDUIT_API}/articles/${process.env.SLUGID}`, {
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    });
    expect(deletedArticleResponse.status()).toEqual(204)
}

export default globalTeardown