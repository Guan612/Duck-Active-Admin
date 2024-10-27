import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActiveDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateActiveDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  content?: string;
}
