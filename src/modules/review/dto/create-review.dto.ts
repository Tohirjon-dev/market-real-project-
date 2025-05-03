import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  orderItemId: number;
  @IsString()
  @Length(0, 100)
  content: string;
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
