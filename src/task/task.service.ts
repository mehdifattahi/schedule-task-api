import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    const scheduleExists = await this.prisma.schedule.findUnique({
      where: { id: data.scheduleId },
    });

    if (!scheduleExists) {
      throw new NotFoundException(
        `Schedule with id ${data.scheduleId} not found`,
      );
    }

    return this.prisma.task.create({
      data: {
        scheduleId: data.scheduleId,
        accountId: data.accountId,
        startTime: data.startTime,
        duration: data.duration,
        type: data.type,
      },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
