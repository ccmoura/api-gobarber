import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();
        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Christopher Conceição',
            email: 'teste2@example.com',
        });

        expect(updatedUser.name).toBe('Christopher Conceição');
        expect(updatedUser.email).toBe('teste2@example.com');
    });

    it('should not be able update the profile from non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'as45das65',
                name: 'test',
                email: 'teste@ex.com'
            }),
        ).rejects.toBeInstanceOf(AppError);

        expect(updatedUser.name).toBe('Christopher Moura');
        expect(updatedUser.email).toBe('teste@example.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Christopher Conceição',
            password: '123456',
            email: 'teste@example.com',
        });

        await expect(updateProfile.execute({
            user_id: user.id;
            name: 'Teste',
            email: 'teste@example.com'
        })).rejects.toBeInstanceOf(AppError);

        expect(updatedUser.name).toBe('Christopher Conceição');
        expect(updatedUser.email).toBe('teste2@example.com');
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Christopher Conceição',
            email: 'teste2@example.com',
            password: '123123',
            old_password: '123456'
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Christopher Conceição',
            email: 'teste2@example.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Christopher Moura',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Christopher Conceição',
            email: 'teste2@example.com',
            old_password: '550063',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);

        expect(updatedUser.password).toBe('123123');
    });
});
