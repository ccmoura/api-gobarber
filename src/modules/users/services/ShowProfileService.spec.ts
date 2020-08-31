import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsersRepository);
    });
    it('should be able show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(updatedUser.name).toBe('Christopher Moura');
        expect(updatedUser.email).toBe('teste@example.com');
    });

    it('should not be able show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: 'as45das65',
            }),
        ).rejects.toBeInstanceOf(AppError);

        expect(updatedUser.name).toBe('Christopher Moura');
        expect(updatedUser.email).toBe('teste@example.com');
    });
});
