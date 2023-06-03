import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import storage = require('../utils/cloud_storage')
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ){}

    findAll(){
        return this.categoriesRepository.find()
    }

    async create(file: Express.Multer.File, category: CreateCategoryDto){
        
        const url = await storage(file, file.originalname);
        if (url === undefined && url === null) {
            throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        category.image = url;
        const newCategory = this.categoriesRepository.create(category)
        return this.categoriesRepository.save(newCategory);

    }

}
