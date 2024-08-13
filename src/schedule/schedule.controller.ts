import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from '@prisma/client';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(@Body(ValidationPipe) createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Schedule> {
    const schedule = await this.scheduleService.findOne(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return schedule;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateScheduleDto: UpdateScheduleDto
  ): Promise<Schedule> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Schedule> {
    return this.scheduleService.remove(id);
  }
}