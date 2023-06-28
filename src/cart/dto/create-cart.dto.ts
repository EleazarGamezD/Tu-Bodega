import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartItemDto {
    
  @ApiProperty({   })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({   })
  @IsNumber()
  quantity: number;

  @ApiProperty({   })
  @IsNotEmpty()
  userId: string;
  
  // @ApiProperty({   })
  // @IsNumber()
  // price: number;
 
}
