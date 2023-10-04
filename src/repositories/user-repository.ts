import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/auth/entities/user-details.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository, Like } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  // method to  find user, when this method receive the vars "email or userName" are converted to lowercase
  public findUser(email?: string, userName?: string, id?: string) {
    const query = this.createQueryBuilder('user').select([
      'user.email',
      'user.password',
      'user.id',
      'user.userName',
      'user.roles',
      'user.isActive',
      'user.fullName',
    ]);

    if (email) {
      query.andWhere('LOWER(user.email) LIKE :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }

    if (userName) {
      query.andWhere('LOWER(user.userName) LIKE :userName', {
        userName: `%${userName.toLowerCase()}%`,
      });
    }

    if (id) {
      query.andWhere('user.id = :id', { id });
    }

    return query.getOne();
  }

  async findUserById(id: string): Promise<User> {
    return this.findOne({ where: { id } }); // Esto buscará un usuario por su ID de manera predeterminada
  }
}

// UserDetails repository extension
@Injectable()
export class UserDetailRepository extends Repository<UserDetails> {
  constructor(
    @InjectRepository(UserDetails)
    detailRepository: Repository<UserDetails>,
  ) {
    super(
      detailRepository.target,
      detailRepository.manager,
      detailRepository.queryRunner,
    );
  }

  // extension of the save method of the UsersDetails repository
  public saveUsersDetails(userDetails) {
    return this.save(userDetails);
  }
}
