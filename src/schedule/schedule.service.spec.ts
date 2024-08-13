import { Test, TestingModule } from "@nestjs/testing";
import { ScheduleService } from "./schedule.service";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

describe("ScheduleService", () => {
  let service: ScheduleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: PrismaService,
          useValue: {
            schedule: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a schedule", async () => {
    const dto: CreateScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    };
    const expectedResult = { id: "uuid", ...dto };

    jest
      .spyOn(prismaService.schedule, "create")
      .mockResolvedValue(expectedResult);

    expect(await service.create(dto)).toEqual(expectedResult);
    expect(prismaService.schedule.create).toHaveBeenCalledWith({ data: dto });
  });

  it("should return all schedules", async () => {
    const expectedResult = [
      {
        id: "uuid1",
        accountId: 1,
        agentId: 1,
        startTime: new Date(),
        endTime: new Date(),
      },
    ];

    jest
      .spyOn(prismaService.schedule, "findMany")
      .mockResolvedValue(expectedResult);

    expect(await service.findAll()).toEqual(expectedResult);
  });

  it("should return a schedule by id", async () => {
    const id = "uuid";
    const expectedResult = {
      id,
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    };

    jest
      .spyOn(prismaService.schedule, "findUnique")
      .mockResolvedValue(expectedResult);

    expect(await service.findOne(id)).toEqual(expectedResult);
  });

  it("should update a schedule", async () => {
    const id = "uuid";
    const dto = new UpdateScheduleDto();
    dto.endTime = new Date();

    const expectedResult = {
      id: "some-id",
      accountId: 123,
      agentId: 456,
      startTime: new Date(),
      endTime: new Date(),
    };

    jest
      .spyOn(prismaService.schedule, "update")
      .mockResolvedValue(expectedResult);

    expect(await service.update(id, dto)).toEqual(expectedResult);
    expect(prismaService.schedule.update).toHaveBeenCalledWith({
      where: { id },
      data: dto,
    });
  });

  it("should delete a schedule", async () => {
    const id = "uuid";
    const expectedResult = {
      id,
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    };

    jest
      .spyOn(prismaService.schedule, "delete")
      .mockResolvedValue(expectedResult);

    expect(await service.remove(id)).toEqual(expectedResult);
    expect(prismaService.schedule.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});
