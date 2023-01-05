import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Vendedor } from 'src/vendedores/entities/vendedores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, Cliente, Producto, Vendedor])
  ],
  controllers: [VentasController],
  providers: [VentasService]
})
export class VentasModule {}
