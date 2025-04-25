import { SQSEvent } from 'aws-lambda';
import { AppointmentRepository } from './infraestructure/repositories/appointment.repository';
import { Prisma } from './infraestructure/database/prisma.database';
import { Appointment } from './domain/entity/appointment.entity';
import { EventBridgePublisher } from './external-services/aws/event-bridge.service';

const repository = new AppointmentRepository(new Prisma());
const eventBridgePublisher = new EventBridgePublisher();

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const snsMessage = JSON.parse(record.body);
    const jsonAppointment = JSON.parse(snsMessage.Message);

    console.log('Obteniendo el mensaje de SNS', snsMessage);

    const appointment = new Appointment(jsonAppointment);

    await repository.createAppointment(appointment);

    console.log('createAppointment', appointment);

    await eventBridgePublisher.publish(appointment);
  }

  return { statusCode: 200 };
};
