import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Vendedor } from 'src/vendedores/entities/vendedores.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Venta)
    private readonly VentaRepository: Repository<Venta>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Vendedor)
    private readonly VendedorRepository: Repository<Vendedor>
  ){}
  async create(createVentaDto: CreateVentaDto) {
    const cliente = await this.clienteRepository.findOneBy({
      id: createVentaDto.cliente
    });
    const producto = await this.productoRepository.findOneBy({
      id: createVentaDto.producto
    });
    const vendedor = await this.VendedorRepository.findOneBy({
      id: createVentaDto.vendedor
    })
    try {
      const venta = this.VentaRepository.create({
        cliente: cliente,
        producto: producto,
        vendedor: vendedor,
      });
      await this.VentaRepository.save(venta);

      return venta;

    } catch (error){
      console.log(error)
      throw new InternalServerErrorException('ayudenme')
    }
  }


  async findAll() {
    return await this.VentaRepository.find({
      relations: {
        cliente: true,
        producto: true,
        vendedor: true,
      }
    });
  }

  async findOne(id: string) {
    const venta = await this.VentaRepository.findOneBy({ id });
    
    if (!venta) {
        throw new NotFoundException(`venta with id '${ id }' not found`);
    }
    return venta;
}

async handleDBExceptions(error: any) {
  throw new Error('Method not implemented.');
}


  async remove(id: string) {
    const venta = await this.findOne(id);

  await this.VentaRepository.remove(venta);

  return 'se elimino la venta';
}
}
