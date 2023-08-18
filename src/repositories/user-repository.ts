import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/auth/entities/user-details.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public findUser(email?, userName?) {
    return this.findOne({
      where: { email, userName },
      select: {
        email: true,
        password: true,
        id: true,
        userName: true,
        roles: true,
        isActive: true,
      },
    });
  }
}

//extension del repositorio UserDetails
@Injectable()
export class UserDetailRepository extends Repository<UserDetails> {
  constructor(
    @InjectRepository(UserDetails)
    detailRepository: Repository<UserDetails>,
  ) {
    super(detailRepository.target, detailRepository.manager, detailRepository.queryRunner);
  }


  //extension del método save del repositorio de UsersDetails
  public saveUsersDetails(userDetails) {
    return this.save(userDetails);
  }
}
