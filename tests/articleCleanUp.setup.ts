import { expect, test as setup } from '@playwright/test'

setup('delete article', async ({ request }) => {
    const deletedArticleResponse = await request.delete(`${process.env.CONDUIT_API}/articles/${process.env.SLUGID}`);
    expect(deletedArticleResponse.status()).toEqual(204)
})