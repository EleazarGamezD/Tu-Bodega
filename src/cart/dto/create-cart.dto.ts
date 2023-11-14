import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCartItemDto {

  @ApiProperty({})
  @IsNotEmpty()
  productId: string;

  @ApiProperty({})
  @IsNumber()
  quantity: number;

  @ApiProperty({})
  @IsNotEmpty()
  @IsOptional()
  userId: string;


}
