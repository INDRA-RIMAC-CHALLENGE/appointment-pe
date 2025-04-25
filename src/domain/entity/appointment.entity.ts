export enum CountryISO {
  PE = 'PE',
  CL = 'CL',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum RecordStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

export class ScheduleDetailEntity {
  centerId: number;

  specialityId: number;

  medicId: number;

  date: string;
}

export class Appointment {
  insuredId: string;

  scheduleId: number;

  scheduleDetail: ScheduleDetailEntity;

  status: AppointmentStatus = AppointmentStatus.PENDING;

  countryISO: CountryISO;

  recordStatus: RecordStatus = RecordStatus.ACTIVE;

  constructor(partial: Partial<Appointment>) {
    Object.assign(this, partial);
  }
}
