import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/express-user.interface';
import { DeliveryReviewgDto } from './dto/deliver-ratings.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('product')
  async createReview(
    @Body() body: CreateReviewDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.reviewService.createReview(body, user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Post('delivery')
  async deliveryReview(
    @Body() body: DeliveryReviewgDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.reviewService.deliveryRating(body, user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('delete/:id')
  async deleteReview(
    @Param('id') id: string,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.reviewService.deleteReviewById(+id, user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
