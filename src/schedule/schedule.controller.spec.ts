import { Test, TestingModule } from "@nestjs/testing";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

describe("ScheduleController", () => {
  let controller: ScheduleController;
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
    service = module.get<ScheduleService>(ScheduleService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a schedule", async () => {
    const dto: CreateScheduleDto = {
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    };
    const expectedResult = { id: "uuid", ...dto };

    jest.spyOn(service, "create").mockResolvedValue(expectedResult);

    expect(await controller.create(dto)).toEqual(expectedResult);
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

    jest.spyOn(service, "findAll").mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toEqual(expectedResult);
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

    jest.spyOn(service, "findOne").mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toEqual(expectedResult);
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

    jest.spyOn(service, "update").mockResolvedValue(expectedResult);

    expect(await controller.update(id, dto)).toEqual(expectedResult);
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

    jest.spyOn(service, "remove").mockResolvedValue(expectedResult);

    expect(await controller.remove(id)).toEqual(expectedResult);
  });
});
