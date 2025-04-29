import { Appointment } from '../../domain/entity/appointment.entity';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Prisma } from '../database/prisma.database';

export class AppointmentRepository implements IAppointmentRepository {
  private prisma: Prisma;

  constructor(prisma: Prisma) {
    this.prisma = prisma;
  }

  async createAppointment(params: Appointment): Promise<Appointment> {
    await this.prisma.$connect();

    const newAppointment = await this.prisma.appointment.create({
      data: params,
    });

    await this.prisma.$disconnect();

    return newAppointment;
  }
}
