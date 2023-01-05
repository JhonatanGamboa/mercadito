import { Venta } from "src/ventas/entities/venta.entity";
import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column( {
        unique: true,
    })
    nombre_cliente: string;

    @Column( {
        unique: true,
    })
    apellidos_cliente: string;
    @Column( {
        unique: true,
    })
    cedula: number;
    @Column( {
        unique: true,
    })
    telefono: number;
}
