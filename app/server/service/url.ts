import { Request, Response } from "express";
import AppDataSource from '../setup/setupTypeorm'
import { Url } from '../entity/url.entity'

const createUrl = async (req: Request, res: Response) => {
    const { data } = req.body

    const urlInstance = new Url()
    urlInstance.title = data.title
    urlInstance.url = data.url
    urlInstance.type = data.type
    urlInstance.tag = Array.isArray(data.tag) ? data.tag.join(',') : data.tag
    urlInstance.readings = 0

    const urlRepository = AppDataSource.getRepository(Url)

    const result = await urlRepository.save(urlInstance)

    return {
        data: result
    }
}

const getUrl = async () => {
    const urlRepository = AppDataSource.getRepository(Url)
    const result = await urlRepository.find()
    return result;
}

export {
    createUrl,
    getUrl
}