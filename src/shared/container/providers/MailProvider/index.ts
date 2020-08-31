import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './models/IMailProvider';
import mailConfig from '@config/mail';

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
),
