import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { $pages, getPagesFx } from './index'

describe('pages store', () => {
  it('кладёт страницы из getPagesFx.doneData', async () => {
    const scope = fork({
      handlers: [
        [
          getPagesFx,
          async () => [
            {
              url: 'about',
              name: 'О нас',
              text: 't',
              seo_title: '',
              seo_description: '',
              seo_keywords: '',
            },
          ],
        ],
      ],
    })

    await allSettled(getPagesFx, { scope })

    expect(scope.getState($pages)).toEqual([
      {
        url: 'about',
        name: 'О нас',
        text: 't',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
      },
    ])
  })
})
