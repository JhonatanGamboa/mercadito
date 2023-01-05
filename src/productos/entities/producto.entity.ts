import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto')
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column( {
        unique: true,
    })
    nombre_producto: string;

    @Column( {
        unique: true,
    })
    precio_producto: number;
    
}
