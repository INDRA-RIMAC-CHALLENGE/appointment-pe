import { EventBridge } from 'aws-sdk';
import {
  envConfig,
  Environment,
} from '../../infraestructure/config/main.config';

export class EventBridgePublisher {
  private eventBridge =
    envConfig.NODE_ENV === Environment.local
      ? new EventBridge({
          region: envConfig.AWS_REGION,
          accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
          secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
        })
      : new EventBridge();

  async publish(event: any) {
    await this.eventBridge
      .putEvents({
        Entries: [
          {
            Source: 'appointment.processor',
            DetailType: 'AppointmentCompleted',
            Detail: JSON.stringify(event),
            EventBusName: 'default',
          },
        ],
      })
      .promise();
  }
}
