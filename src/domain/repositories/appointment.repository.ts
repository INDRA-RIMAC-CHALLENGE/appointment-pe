import { Appointment } from '../entity/appointment.entity';

export abstract class IAppointmentRepository {
  constructor() {}

  abstract createAppointment(params: Appointment): Promise<Appointment>;
}
