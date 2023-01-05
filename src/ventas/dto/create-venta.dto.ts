import { IsString, IsUUID } from "class-validator";

export class CreateVentaDto {


    @IsString()
    @IsUUID()
    cliente: string;

    @IsString()
    @IsUUID()
    producto: string;

    @IsString()
    @IsUUID()
    vendedor: string;

    
}
