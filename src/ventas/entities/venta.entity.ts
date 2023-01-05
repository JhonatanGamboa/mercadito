import { Cliente } from "src/clientes/entities/cliente.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Vendedor } from "src/vendedores/entities/vendedores.entity";
import { Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(() => Cliente)
    @JoinColumn()
    cliente: Cliente;

    @ManyToOne(() => Producto)
    @JoinColumn()
    producto: Producto;

    @ManyToOne(() => Vendedor)
    @JoinColumn()
    vendedor: Vendedor;
    
}
