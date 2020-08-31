import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const found = this.users.find(user => user.id === id);

        return found;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const found = this.users.find(user => user.email === email);

        return found;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }

    public async findAllProviders({
        except_user__id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user__id) {
            users = this.users.filter(user => user.id !== except_user__id);
        }

        return users;
    }
}
