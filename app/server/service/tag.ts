import { Request, Response } from "express";
import ArrayToTree from 'array-to-tree';
import AppDataSource from '../setup/setupTypeorm'
import { Tag } from '../entity/tag.entity'

const createTag = async (req: Request, res: Response) => {
    console.log(req.body)

    const tagInstance = new Tag()
    tagInstance.value = "Me and Bears"
    tagInstance.label = "I am near polar bears"
    tagInstance.parent_id = "urlInstance-with-bears.jpg"

    const urlRepository = AppDataSource.getRepository(Tag)

    const result = await urlRepository.save(tagInstance)

    return {
        data: result
    }
}

const getTagsAsTree = async (req: Request, res: Response) => {
    const tagRepository = AppDataSource.getRepository(Tag)
    const result = await tagRepository.find({
        select: ['value', 'label', 'parent_id', 'id'],
    })
    return ArrayToTree(result);
}

export {
    createTag,
    getTagsAsTree
}