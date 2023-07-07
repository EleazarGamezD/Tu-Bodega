import { ApiProperty } from "@nestjs/swagger"
import {  IsArray, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator"


export class LoginUserDto{

@ApiProperty({   })
@IsString()
@IsOptional()
email:string

@ApiProperty({   })
@IsString()
@IsOptional()
userName:string

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
@IsOptional()
phone:string

@ApiProperty({   })
@IsString()
@IsOptional()
direction:string

@ApiProperty({   })
@IsString()  
@IsArray()
@IsOptional()
roles: string[];  
}