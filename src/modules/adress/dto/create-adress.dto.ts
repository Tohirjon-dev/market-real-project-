import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateAdressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  region: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  city: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  street: string;
}
