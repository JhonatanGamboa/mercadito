import { IsNumber, IsPositive, IsString } from "class-validator";



export class CreateVendedoreDto {

    @IsString()
    name: string;

    @IsPositive()
    @IsNumber()
    cedula: number;

    @IsString() 
    nombre_tienda: string;


}
