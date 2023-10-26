import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product Price',
    nullable: false,
    minLength: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product Description',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product Slug',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product inventory stock',
    nullable: false,
    minLength: 1,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product Size Optional',
    nullable: true,
  })
  @IsString({ each: true }) // como es un objeto valido que cada elemento cumpla la condición
  @IsArray()
  @IsOptional()
  sizes?: string[];

  @ApiProperty({
    description: 'Product Gender (men, women, kid, unisex) Optional',
    nullable: true,

  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'Product Tags',
    nullable: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
