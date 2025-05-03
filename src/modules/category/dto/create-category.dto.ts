import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(4, 100)
  @IsNotEmpty()
  name: string;
}
