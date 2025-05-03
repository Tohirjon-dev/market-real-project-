import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 72)
  @IsNotEmpty()
  name: string;
  @IsString()
  @Length(4, 72)
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  password: string;
  @IsString()
  @Length(9, 16)
  @IsNotEmpty()
  phone_number: string;
}
