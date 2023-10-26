
import  { CreateUserDto } from "./create-user.dto"; 
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto extends CreateUserDto {
  
}

export class UpdateUserDetailsDto {
  @ApiProperty({
    description: 'user address ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'user city ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'user phone ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'user country ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  country: string;
}