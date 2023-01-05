import { IsNumber, IsPositive, IsString } from "class-validator";


export class CreateClienteDto {
@IsString()
nombre_cliente: string;

@IsString()
apellidos_cliente: string;

@IsNumber()
@IsPositive()
cedula: number;

@IsNumber()
@IsPositive()
telefono: number;


}

