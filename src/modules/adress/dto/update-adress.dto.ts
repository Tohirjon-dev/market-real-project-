import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAdressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  new_region: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  new_city: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  new_street: string;
}
