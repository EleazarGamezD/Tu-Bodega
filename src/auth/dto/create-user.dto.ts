import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator"



export class CreateUserDto{

@ApiProperty({   })
@IsString()
email:string

@ApiProperty({   })
@IsString()
@MinLength(6)
@MaxLength(50)
@Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
})
password:string

@ApiProperty({   })
@IsString()
@MinLength(1)
fullName:string

@ApiProperty({   })
@IsString()
userName:string

@ApiProperty({   })
@IsString({each: true})
@IsArray()
@IsOptional()
userDetails:string[]


@ApiProperty({   })
@IsString()
@IsOptional()
address: string;

@ApiProperty({   })
@IsString()
@IsOptional()
city: string;

@ApiProperty({   })
@IsString()
@IsOptional()
phone: string;

@ApiProperty({   })
@IsString()  
@IsOptional()
country: string; 

@ApiProperty({   })
@IsString()  
@IsOptional()
name: string; 

@ApiProperty({   })
@IsString()  
@IsArray()
@IsOptional()
roles: string[]; 
}