import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private CategoriesService: CategoriesService){ }

    @HasRoles(JwtRole.CLIENT,JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll(){
        return this.CategoriesService.findAll()
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|gif)' }),
                ],
            }),
        ) file: Express.Multer.File,
        @Body() category: CreateCategoryDto
    ){
        return this.CategoriesService.create(file, category);
    }

}
