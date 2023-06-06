import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){}

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('files[]', 2))
    create(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|gif)' }),
                ],
            }),
        ) files: Array<Express.Multer.File>,
        @Body() product: CreateProductDto
    ){
        return this.productsService.create(files, product);
    }

}
