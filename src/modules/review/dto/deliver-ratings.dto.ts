import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class DeliveryReviewgDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;
  @IsString()
  @MaxLength(100)
  deliveryFeedback: string;
  @IsInt()
  @Min(1)
  @Max(5)
  deliveryRating: number;
}
