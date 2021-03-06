import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderappointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;

        const listProviderAppointmentsService = container.resolve(
            CreateAppointmentService,
        );

        const appointments = await createAppointment.execute({
            day,
            month,
            year,
            provider_id,
        });

        return response.json(appointments);
    }
}
