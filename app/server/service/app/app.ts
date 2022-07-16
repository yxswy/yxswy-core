import { NextFunction, Request, Response } from "express";
import fs from 'fs'
import { resolve } from 'path'
import { ViteDevServer } from 'vite'

const app222 = async (req: Request, res: Response, next: NextFunction, vite: ViteDevServer) => {
    // const { data } = req.body
    const url = req.originalUrl.replace('/test/', '/')

    let template, render

    template = fs.readFileSync(resolve('index.html'), 'utf-8')
    console.log(url)

    template = await vite.transformIndexHtml(url, template)
    render = (await vite.ssrLoadModule('/src/entry-server.js')).render

    const mainfest = {}
    const [appHtml, preloadLinks] = await render(url, mainfest)

    const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

        res.status(200).set({ "Content-Type": "text/html" }).end(html);
}

export {
    app222
}