import { PartialType } from '@nestjs/swagger';
import  { CreateUserDto } from "./create-user.dto"; 

export class UpdateUserDto  {
    roles: string[]; // Puedes ajustar el tipo según tu implementación
    isActive: boolean;
  
    userDetails: {
        address?: string;
        city?: string;
        phone?: string;
        country?: string;
    }
}
