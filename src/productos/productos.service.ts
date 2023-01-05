import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly ProductoRepository: Repository<Producto>

  ){}
  async create(createProductoDto: CreateProductoDto) {
    
    try {

      const producto = this.ProductoRepository.create(createProductoDto);
      await this.ProductoRepository.save( producto);

      return producto;

    } catch (error){
      console.log(error)
      throw new InternalServerErrorException('ayudenme')
    }
  }

  async findAll() {
    return await this.ProductoRepository.find();
  }

  async findOne(id: string) {
    const producto = await this.ProductoRepository.findOneBy({ id });
    
    if (!producto) {
        throw new NotFoundException(`vendedores with id '${ id }' not found`);
    }
    return producto;
}

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.ProductoRepository.preload({
      id: id,
      ...updateProductoDto
    });
    
    if (!producto) {
      throw new NotFoundException('product with id: ${id} not found');
    }

    try{
    await this.ProductoRepository.save(producto);
    return producto;
    } catch (error) {
      console.log(error);
      
      this.handleDBExceptions(error);
    }
}
handleDBExceptions(error: any) {
  throw new Error('Method not implemented.');
}

  async remove(id: string) {
    const producto = await this.findOne(id);

    await this.ProductoRepository.remove(producto);

    return 'se elimino el producto';
  }
}
