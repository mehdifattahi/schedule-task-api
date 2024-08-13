import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import request from "supertest";

describe("Task Endpoints (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  const createdEntities: { schedules: string[]; tasks: string[] } = {
    schedules: [],
    tasks: [],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    prismaService = app.get<PrismaService>(PrismaService);

    const response = await request(app.getHttpServer())
      .post("/schedules")
      .send({
        accountId: 5,
        agentId: 5,
        startTime: "2024-08-11T09:00:00.000Z",
        endTime: "2024-08-11T17:00:00.000Z",
      });

    createdEntities.schedules.push(response.body.id);
  });

  afterAll(async () => {
    await prismaService.task.deleteMany({
      where: { id: { in: createdEntities.tasks } },
    });
    await prismaService.schedule.deleteMany({
      where: { id: { in: createdEntities.schedules } },
    });
    await app.close();
  });

  it("should create a task", async () => {
    const scheduleId = createdEntities.schedules[0];
    const response = await request(app.getHttpServer())
      .post("/tasks")
      .send({
        accountId: 5,
        scheduleId: scheduleId,
        startTime: "2024-08-11T10:00:00.000Z",
        duration: 60,
        type: "work",
      })
      .expect(201);
    createdEntities.tasks.push(response.body.id);

    expect(response.body).toHaveProperty("id");
    expect(response.body.accountId).toBe(5);
    expect(response.body.scheduleId).toBe(scheduleId);
    expect(new Date(response.body.startTime)).toEqual(
      new Date("2024-08-11T10:00:00.000Z"),
    );
    expect(response.body.duration).toBe(60);
    expect(response.body.type).toBe("work");
  });

  it("should get all tasks", async () => {
    const response = await request(app.getHttpServer())
      .get("/tasks")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a task by id", async () => {
    const scheduleId = createdEntities.schedules[0];
    const createResponse = await request(app.getHttpServer())
      .post("/tasks")
      .send({
        accountId: 5,
        scheduleId: scheduleId,
        startTime: "2024-08-11T11:00:00.000Z",
        duration: 30,
        type: "break",
      });

    const taskId = createResponse.body.id;
    createdEntities.tasks.push(taskId);

    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(response.body.id).toBe(taskId);
  });

  it("should update a task", async () => {
    const scheduleId = createdEntities.schedules[0];
    const createResponse = await request(app.getHttpServer())
      .post("/tasks")
      .send({
        accountId: 5,
        scheduleId: scheduleId,
        startTime: "2024-08-11T13:00:00.000Z",
        duration: 45,
        type: "work",
      });

    const taskId = createResponse.body.id;
    createdEntities.tasks.push(taskId);

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({
        duration: 60,
      })
      .expect(200);

    expect(response.body.duration).toBe(60);
  });

  it("should delete a task", async () => {
    const scheduleId = createdEntities.schedules[0];
    const createResponse = await request(app.getHttpServer())
      .post("/tasks")
      .send({
        accountId: 5,
        scheduleId: scheduleId,
        startTime: "2024-08-11T14:00:00.000Z",
        duration: 90,
        type: "work",
      });

    const taskId = createResponse.body.id;
    createdEntities.tasks.push(taskId);

    await request(app.getHttpServer()).delete(`/tasks/${taskId}`).expect(200);

    await request(app.getHttpServer()).get(`/tasks/${taskId}`).expect(404);
  });
});
