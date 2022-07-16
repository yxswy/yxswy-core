import BaseRunServer from './setup/setupServer'

import { testApi } from './service/test/index'
import { createUrl, getUrl } from './service/url'
import { createTag, getTagsAsTree } from './service/tag'

const app = new BaseRunServer()

app.setRoute('/', testApi)

app.setRoute('/url', getUrl)
app.setRoute('/url/create', createUrl)

app.setRoute('/tag', getTagsAsTree)
app.setRoute('/tag/create', createTag)

app.listen(3010)
