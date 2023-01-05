import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { cliente } from './interfaces/cliente.interfaces';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly ClienteRepository: Repository<Cliente>
  ){}

  async create(createClienteDto: CreateClienteDto) {

    try {
      const cliente = this.ClienteRepository.create(createClienteDto);
      await this.ClienteRepository.save( cliente);

      return cliente;

    } catch (error){
      console.log(error)
      throw new InternalServerErrorException('ayudenme')
    }
  }

  async findAll() {
    return await this.ClienteRepository.find();
  }

  async findOne(id: string) {
    const cliente = await this.ClienteRepository.findOneBy({ id });
    
    if (!cliente) {
        throw new NotFoundException(`cliente with id '${ id }' not found`);
    }
    return cliente;
}

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.ClienteRepository.preload({
      id: id,
      ...updateClienteDto
    });
    
    if (!cliente) {
      throw new NotFoundException('product with id: ${id} not found');
    }

    try{
    await this.ClienteRepository.save(cliente);
    return cliente;
    } catch (error) {
      console.log(error);
      
      this.handleDBExceptions(error);
    }
}
async handleDBExceptions(error: any) {
  throw new Error('Method not implemented.');
}

  async remove(id: string) {
  const cliente = await this.findOne(id);

  await this.ClienteRepository.remove(cliente);

  return 'se elimino el cliente';
}
}
