import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPAsswordDto {
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  new_password: string;
}
