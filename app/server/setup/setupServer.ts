import express, { Express, NextFunction, Request, Response } from "express";
import { yellowBright, gray, greenBright } from "chalk";
import cors from "cors";
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

interface HandlerFunction {
  (req: Request, res: Response, next?: NextFunction): unknown;
}

class BaseRunServer {
  private server: Express;
  constructor() {
    // 创建并设置express app
    this.server = express();

    this.server.use(logger(
      greenBright(`\n   :remote-addr :method :url :status :res[content-length] - :response-time ms 👽👻`)
    ))

    // 解析 body
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({ extended: false }))

    // 跨域
    this.server.use(cors());
    this.server.use(cookieParser())
  }

  setRoute(path: string, handlerFunction: HandlerFunction) {
    const handler = async (req: Request, res: Response): Promise<void> => {
      const result = await handlerFunction(req, res);
      res.send(result);
    };
    const contextPath = "/api";
    this.server.post(contextPath + path, handler);
  }

  listen(port: number, callback?: (() => void) | undefined) {
    this.server.listen(port, callback);
    console.log(
      gray(`\n   Express server listening on `),
      yellowBright(`http://localhost:${port} \n`)
    );
  }
}

export default BaseRunServer;
