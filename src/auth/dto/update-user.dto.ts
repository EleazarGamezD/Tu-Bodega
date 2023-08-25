import { ApiProperty, PartialType } from '@nestjs/swagger';
import  { CreateUserDto } from "./create-user.dto"; 

export class UpdateUserDto {
  @ApiProperty()
  roles: string[]; // Puedes ajustar el tipo según tu implementación

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  userDetails: {
      
    address?: string;
    city?: string;
    phone?: string;
    country?: string;
  };
}
