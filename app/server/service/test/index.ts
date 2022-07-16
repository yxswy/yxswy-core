import { Request, Response } from "express";
import AppDataSource from '../../setup/setupTypeorm'
import { Tag } from '../../entity/tag.entity'

const testApi = async (req: Request, res: Response) => {
    const tagRepository = AppDataSource.getRepository(Tag)
    const items = await tagRepository.find()

    return {
        data: items
    }
}

export {
    testApi
}