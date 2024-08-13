import { IsNotEmpty, IsInt, IsDate, IsUUID, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskType } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  scheduleId!: string;

  @IsNotEmpty()
  @IsInt()
  accountId!: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startTime!: Date;

  @IsNotEmpty()
  @IsInt()
  duration!: number;

  @IsNotEmpty()
  @IsEnum(TaskType)
  type!: TaskType;
}
