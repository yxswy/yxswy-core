import express, { NextFunction, Request, Response } from "express";
import { greenBright } from "chalk";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ViteDevServer } from "vite";
import fs from "fs";
import { resolve } from "path";

import { testApi } from "../service/test/index";
import { createUrl, getUrl } from "../service/url";
import { createTag, getTagsAsTree } from "../service/tag";

async function createServer() {
  // 创建并设置express app
  const app = express();
  const vite: ViteDevServer = await setupVite();

  app.use(vite.middlewares);

  // 访问日志
  app.use(
    logger(
      greenBright(
        `\n   :remote-addr :method :url :status :res[content-length] - :response-time ms 👽👻`
      )
    )
  );

  // 解析 body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // 跨域
  app.use(cors());
  app.use(cookieParser());

  setRoute("/", testApi);
  setRoute("/url", getUrl);
  setRoute("/url/create", createUrl);
  setRoute("/tag", getTagsAsTree);
  setRoute("/tag/create", createTag);

  app.use("*", async (req: Request, res: Response) => {
    const url = req.originalUrl.replace("/test/", "/");

    let template, render;

    template = fs.readFileSync(resolve("index.html"), "utf-8");

    template = await vite.transformIndexHtml(url, template);
    render = (await vite.ssrLoadModule("/src/entry-server.js")).render;

    const mainfest = {};
    const [appHtml, preloadLinks] = await render(url, mainfest);

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  function setRoute(path: string, handlerFunction: HandlerFunction) {
    const handler = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const result = await handlerFunction(req, res, next);
      res.send(result);
    };
    const contextPath = "/api";

    app.post(contextPath + path, handler);
  }
  return { app };
}

interface HandlerFunction {
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): unknown;
}

async function setupVite() {
  return await (
    await import("vite")
  ).createServer({
    base: "/test/",
    root: process.cwd(),
    server: {
      middlewareMode: true,
      watch: {
        //在测试过程中，我们编辑文件的速度太快，有时甚至是chokidar
        //错过更改事件，因此强制轮询以保持一致性
        usePolling: true,
        interval: 100,
      },
    },
    appType: "custom",
  });
}

export { createServer };
