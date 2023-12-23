import { UserDetails } from 'src/auth/entities/user-details.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository extends Repository<User> {
    constructor(repository: Repository<User>);
    findUser(email?: string, userName?: string, id?: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
export declare class UserDetailRepository extends Repository<UserDetails> {
    constructor(detailRepository: Repository<UserDetails>);
    saveUsersDetails(userDetails: any): Promise<any>;
}
