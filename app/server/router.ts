import { NextFunction, Request, Response, Router } from "express";

import { testApi } from "./service/test/index";
import { createUrl, getUrl } from "./service/url";
import { createTag, getTagsAsTree } from "./service/tag";

const router = Router();

setRoute("/", testApi);
setRoute("/url", getUrl);
setRoute("/url/create", createUrl);
setRoute("/tag", getTagsAsTree);
setRoute("/tag/create", createTag);

interface HandlerFunction {
  (req: Request, res: Response, next: NextFunction): unknown;
}

function setRoute(path: string, handlerFunction: HandlerFunction) {
  router.post(
    path,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await handlerFunction(req, res, next);
      res.send(result);
    }
  );
}

export default router;
