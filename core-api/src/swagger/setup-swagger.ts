import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiTags } from './api-tags'
import { swaggerCss } from './swagger.css'

const description = [
  'Accounts, sessions, and the current user profile.',
  '',
  'The first segment after `/api` is the access zone.',
  '',
  '- **unauth** — no session',
  '- **public** — any signed-in user, cookie `accessToken`',
  '- **admin** — signed-in user with the `ADMIN` role',
  '',
  'Try it out sends cookies when this page is opened on the same host as the API.',
].join('\n')

const relabelSearch = `
(() => {
  let tries = 0
  const tick = () => {
    const input = document.querySelector('.operation-filter-input')
    if (input) {
      input.setAttribute('placeholder', 'Search endpoints')
      return
    }
    if (tries++ < 40) requestAnimationFrame(tick)
  }
  tick()
})()
`

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Zhibul Core')
    .setDescription(description)
    .setVersion('1.0.0')
    .addCookieAuth(
      'accessToken',
      {
        type: 'apiKey',
        in: 'cookie',
        description:
          'HttpOnly cookie. Login and refresh set it; the browser sends it with the next request.',
      },
      'accessToken',
    )

  for (const tag of apiTags) {
    config.addTag(tag.name, tag.description)
  }

  const document = SwaggerModule.createDocument(app, config.build())

  document.tags = apiTags.map(({ name, description: tagDescription }) => ({
    name,
    description: tagDescription,
  }))

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Zhibul Core',
    customCss: swaggerCss,
    customJsStr: relabelSearch,
    swaggerOptions: {
      deepLinking: true,
      docExpansion: 'list',
      filter: true,
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 2,
      syntaxHighlight: { theme: 'nord' },
      validatorUrl: null,
    },
  })
}
