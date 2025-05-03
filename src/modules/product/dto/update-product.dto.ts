import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsInt()
  @IsNotEmpty()
  product_id: number;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
