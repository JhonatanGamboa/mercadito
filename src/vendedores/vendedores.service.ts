import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { UpdateVendedoreDto } from './dto/update-vendedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedores.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class VendedoresService {

  constructor(
    @InjectRepository(Vendedor)
    private readonly VendedorRepository: Repository<Vendedor>
  ){}
  
   async create(createVendedorDto: CreateVendedoreDto) {

    try {

      const vendedor = this.VendedorRepository.create(createVendedorDto);
      await this.VendedorRepository.save( vendedor);

      return vendedor;

    } catch (error){
      console.log(error)
      throw new InternalServerErrorException('ayudenme')
    }
  }
  findAll() {
  return this.VendedorRepository.find({});
  }

  async findOne(id: string ) {

    const vendedores = await this.VendedorRepository.findOneBy({ id });
    
    if (!vendedores) {
        throw new NotFoundException(`vendedores with id '${ id }' not found`);
    }
    return vendedores;
}

    async update(id: string, updateVendedoreDto: UpdateVendedoreDto) {

      const vendedor = await this.VendedorRepository.preload({
        id: id,
        ...updateVendedoreDto
      });

      if (!vendedor) throw new NotFoundException('product with id: ${id} not found');
      try{
      await this.VendedorRepository.save(vendedor);
      return vendedor;
      } catch (error) {
        this.handleDBExceptions(error);
      }
  }
  handleDBExceptions(error: any) {
    throw new Error('Method not implemented.');
  }

  async remove(id: string) {
    const vendedor = await this.findOne(id);

    await this.VendedorRepository.remove(vendedor);

    return 'se elimino el vendedor';
  }
  
}

