import { Router, request, response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
}); */

appointmentsRouter.post(
    '/',
    celebrate,

        '/',
            brate,
    {    date: Joi.date(),
        },   [Segments.BODY]: {
    },
    appointmentsController.create,
ng().uuid().required(),
            date: Joi.date(),
        },
    },
    appointmentsController.create,
);
appointmentsRouter.post('/me', providerAppointmentsController.index);

export default appointmentsRouter;
