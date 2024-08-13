import "reflect-metadata";
import { validate } from "class-validator";
import { CreateScheduleDto } from "./create-schedule.dto";

describe("CreateScheduleDto", () => {
  it("should validate all fields correctly", async () => {
    const dto = new CreateScheduleDto();
    dto.accountId = 1;
    dto.agentId = 1;
    dto.startTime = new Date("2024-08-11T09:00:00Z");
    dto.endTime = new Date("2024-08-11T17:00:00Z");

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation when fields are missing", async () => {
    const dto = new CreateScheduleDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
