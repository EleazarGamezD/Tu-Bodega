import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCartDto {
    @ApiProperty({
     description: 'Product Title (unique)',
     nullable: false,
     minLength: 1 ,
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({   })
    @IsNumber()
    @IsPositive()   
    @IsOptional()
    price?: number;

    @ApiProperty({   })
    @IsNumber()
    @IsPositive()   
    @IsOptional()
    amount?: number;

    @ApiProperty({   })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?:string[]
}
