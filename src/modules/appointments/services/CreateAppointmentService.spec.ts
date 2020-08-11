import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '0523146',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('0523146');
    });

    it('should not to be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '0523146',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '0523146',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
