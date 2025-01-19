import {
  IsDate,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIntegralDto {
  @IsNotEmpty()
  @IsNumber()
  userid: number;
}

export class UpdateActiveDto {
  @IsNotEmpty()
  @IsNumber()
  userid: number;

  @IsOptional()
  @IsNumber()
  learnedPoints?: number;

  @IsOptional()
  @IsNumber()
  actionPoints?: number;

  @IsOptional()
  @IsNumber()
  beautyPoints?: number;

  @IsOptional()
  @IsNumber()
  moralPoints?: number;
}
