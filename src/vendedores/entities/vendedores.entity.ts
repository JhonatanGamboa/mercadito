import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendedores')
export class Vendedor {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    name: string;

    @Column( {
        unique: true,
    })
    cedula: number;

    @Column( {
        unique: true,
    })
    nombre_tienda: string;
}



