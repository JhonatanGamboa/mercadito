import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';
import { Vendedor } from './entities/vendedores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([Vendedor])
  ],
  controllers: [VendedoresController],
  providers: [VendedoresService]
})
export class VendedoresModule {}
