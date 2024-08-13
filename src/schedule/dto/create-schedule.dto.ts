import { IsNotEmpty, IsInt, IsDate } from "class-validator";
import { Type, Transform } from "class-transformer";

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  accountId!: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  agentId!: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startTime!: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endTime!: Date;
}
