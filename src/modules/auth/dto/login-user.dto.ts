import { IsNotEmpty, IsString, Length } from 'class-validator';

export class loginUserDto {
  @IsString()
  @Length(9, 16)
  @IsNotEmpty()
  phone_number: string;
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  password: string;
}
