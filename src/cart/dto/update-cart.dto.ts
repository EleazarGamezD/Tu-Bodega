import { PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartItemDto) {}
