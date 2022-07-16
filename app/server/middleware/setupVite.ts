import { createServer } from 'vite'

export const setupMiddleware = async () => {
    // 开始创建服务渲染
    const vite = await createServer({
        server: {
          middlewareMode: true,
          watch: {
            //在测试过程中，我们编辑文件的速度太快，有时甚至是chokidar
            //错过更改事件，因此强制轮询以保持一致性
            usePolling: true,
            interval: 100
          }
        }
    })

    return vite.middlewares
}