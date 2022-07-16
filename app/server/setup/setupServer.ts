import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import { greenBright } from "chalk";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ViteDevServer } from "vite";

import { testApi } from "../service/test/index";
import { createUrl, getUrl } from "../service/url";
import { createTag, getTagsAsTree } from "../service/tag";
import { app222 } from "../service/app/app";


async function createServer() {
  // 创建并设置express app
  const app = express();
  const vite: ViteDevServer = await setupVite();

  app.use(vite.middlewares);

  // 访问日志
  app.use(logger(
    greenBright(`\n   :remote-addr :method :url :status :res[content-length] - :response-time ms 👽👻`)
  ))

  // 解析 body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // 跨域
  app.use(cors());
  app.use(cookieParser())

  setRoute("/", testApi);
  setRoute("/url", getUrl);
  setRoute("/url/create", createUrl);
  setRoute("/tag", getTagsAsTree);
  setRoute("/tag/create", createTag);

  app.use("*", (...args) => app222(...args, vite));

  function setRoute(path: string, handlerFunction: HandlerFunction) {6
    const handler = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const result = await handlerFunction(req, res, next, vite);
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
    next: NextFunction,
    vite: ViteDevServer
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
