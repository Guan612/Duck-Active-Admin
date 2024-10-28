import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  activitieId: number;
}

export class UpdateRegistrationDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  activitieId: number;
}
