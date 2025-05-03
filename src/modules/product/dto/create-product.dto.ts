import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 72)
  @IsNotEmpty()
  name: string;
  @IsString()
  @Length(0, 100)
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  stock: number;
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
