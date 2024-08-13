import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({ data: createScheduleDto });
  }

  async findAll() {
    return this.prisma.schedule.findMany();
  }

  async findOne(id: string) {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({ where: { id }, data: updateScheduleDto });
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
