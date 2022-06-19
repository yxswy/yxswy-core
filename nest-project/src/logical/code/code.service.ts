import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeEntity } from './code.entity';

@Injectable()
export class CodeService {
    constructor(
        @InjectRepository(CodeEntity)
        private readonly codeRepository: Repository<CodeEntity>
    ) {}

    async findAll(): Promise<CodeEntity[]> {
        return await this.codeRepository.find()
    }

    async findById(id: number): Promise<CodeEntity> {
        return await this.codeRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async create(): Promise<CodeEntity> {
        return await this.codeRepository.create({
            file_name: '1',
            file_path: '2',
            file_extname: 'js',
            file_title: '2',
            file_content: '2',
            readings: 2,
        })
        // try {
        //     const files: any[] = req.files || []
        //     if (files.length < 1) {
        //         throw new Error('文件异常')
        //     }
        //     const file = files[0]
        //     const originalname = file.originalname
        //     if (!originalname) {
        //         throw new Error('文件异常')
        //     }
        //     const tempPath = file.path
        //     const filePath = join(__dirname, '../../static', originalname) //文件名
        //     const data = readFileSync(tempPath)
    
        //     await writeFileSync(filePath, data)
    
        //     const { fileName, fileTitle, fileContent, fileExtname } =
        //         await processLineByLine(filePath)
    
        //     const respository = await getRepository(FileEntity)
        //     await respository.query(
        //         'INSERT INTO file_entity (file_name, file_path, file_extname, file_title, file_content)  VALUES  (?, ?, ?, ?, ?);',
        //         [fileName, filePath, fileExtname, fileTitle, fileContent]
        //     )
        //     console.log(fileName, filePath, fileExtname)
    
        //     const response = {
        //         message: 'File uploaded successfully.',
        //         filename: originalname,
        //     }
        //     res.json(response)
        // } catch (e) {
        //     console.log(red(e))
        //     const response = {
        //         message: 'Failed to upload files.',
        //         detailedInformation: e,
        //     }
        //     res.json(response)
        // }
    }
}
