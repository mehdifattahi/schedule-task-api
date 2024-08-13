import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import request from "supertest";

describe("Schedule Endpoints (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  const createdSchedules: string[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.schedule.deleteMany({
      where: { id: { in: createdSchedules } },
    });
    await app.close();
  });

  it("should create a schedule", async () => {
    const response = await request(app.getHttpServer())
      .post("/schedules")
      .send({
        accountId: 1,
        agentId: 1,
        startTime: "2024-08-12T09:00:00.000Z",
        endTime: "2024-08-12T17:00:00.000Z",
      })
      .expect(201);
    createdSchedules.push(response.body.id);

    expect(response.body).toHaveProperty("id");
    expect(response.body.accountId).toBe(1);
    expect(response.body.agentId).toBe(1);
    expect(new Date(response.body.startTime)).toEqual(
      new Date("2024-08-12T09:00:00.000Z"),
    );
    expect(new Date(response.body.endTime)).toEqual(
      new Date("2024-08-12T17:00:00.000Z"),
    );
  });

  it("should get all schedules", async () => {
    const response = await request(app.getHttpServer())
      .get("/schedules")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a schedule by id", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/schedules")
      .send({
        accountId: 2,
        agentId: 2,
        startTime: "2024-08-13T09:00:00.000Z",
        endTime: "2024-08-13T17:00:00.000Z",
      });

    const scheduleId = createResponse.body.id;
    createdSchedules.push(scheduleId);

    const response = await request(app.getHttpServer())
      .get(`/schedules/${scheduleId}`)
      .expect(200);

    expect(response.body.id).toBe(scheduleId);
  });

  it("should update a schedule", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/schedules")
      .send({
        accountId: 3,
        agentId: 3,
        startTime: "2024-08-14T09:00:00.000Z",
        endTime: "2024-08-14T17:00:00.000Z",
      });

    const scheduleId = createResponse.body.id;
    createdSchedules.push(scheduleId);

    const response = await request(app.getHttpServer())
      .patch(`/schedules/${scheduleId}`)
      .send({
        endTime: "2024-08-14T18:00:00.000Z",
      })
      .expect(200);

    expect(new Date(response.body.endTime)).toEqual(
      new Date("2024-08-14T18:00:00.000Z"),
    );
  });

  it("should delete a schedule", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/schedules")
      .send({
        accountId: 4,
        agentId: 4,
        startTime: "2024-08-15T09:00:00.000Z",
        endTime: "2024-08-15T17:00:00.000Z",
      });

    const scheduleId = createResponse.body.id;
    createdSchedules.push(scheduleId);

    await request(app.getHttpServer())
      .delete(`/schedules/${scheduleId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/schedules/${scheduleId}`)
      .expect(404);
  });
});
