import { validate } from 'class-validator';
import { UpdateScheduleDto } from './update-schedule.dto';

describe('UpdateScheduleDto', () => {
  it('should validate optional fields correctly', async () => {
    const dto = new UpdateScheduleDto();
    dto.endTime = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with no fields provided', async () => {
    const dto = new UpdateScheduleDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
