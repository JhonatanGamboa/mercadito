import { IsNumber, IsPositive, IsString } from "class-validator";



export class CreateProductoDto {

@IsString()
nombre_producto: string;

@IsNumber()
@IsPositive()
precio_producto: number;


}
