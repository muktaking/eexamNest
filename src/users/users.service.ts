import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { to } from "src/utils/utils";
import { createUserDto } from "./dto/create-user.dto";
import { RolePermitted, User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async createUser(createUserDto: createUserDto) {
    let {
      firstName,
      lastName,
      userName,
      password,
      email,
      gender,
    } = createUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = userName;
    user.email = email;
    user.gender = gender;

    //hashing password
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        throw new ConflictException(`Email: ['${email}'] is already exist.`);
      } else throw new InternalServerErrorException();
    }
  }

  // async createUser(createUserDto: createUserDto) {
  //   let {
  //     firstName,
  //     last Name,
  //     userName,
  //     password,
  //     email,
  //     gender,
  //   } = createUserDto;
  //   const user = new this.UserModel({
  //     firstName,
  //     lastName,
  //     userName,
  //     password,
  //     email,
  //     gender,
  //   });
  //   //hashing password
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(password, salt);
  //     await user.save();
  //   } catch (error) {
  //     if (error.code == 11000) {
  //       throw new ConflictException(`Email: ['${email}'] is already exist.`);
  //     } else throw new InternalServerErrorException();
  //   }
  // }

  async findAllUsers() {
    return await this.userRepository.find({});
  }

  // async findAllUsers(): Promise<User[] | InternalServerErrorException> {
  //   return await this.UserModel.find({}, { password: 0, __v: 0 });
  // }
  // async findUserById(id: string): Promise<User | InternalServerErrorException> {
  //   return await this.UserModel.findById(id, { password: 0, __v: 0 });
  // }

  async findOneUser(
    email: string,
    nameOnly: boolean = false
  ): Promise<User | any> {
    if (nameOnly) {
      const user = await this.userRepository.findOne(
        { email },
        { select: ["id", "firstName", "lastName"] }
      );
      return { name: user.firstName + " " + user.lastName, id: user.id };
    }
    const user = await this.userRepository.findOne({ email: email });
    return user;
  }

  // async findOneUser(
  //   email: string,
  //   nameOnly: boolean = false
  // ): Promise<User | any> {
  //   if (nameOnly) {
  //     const user = await this.UserModel.findOne(
  //       { email },
  //       { firstName: 1, lastName: 1, id: 1 }
  //     );
  //     return { name: user.firstName + " " + user.lastName, id: user.id };
  //   }
  //   return await this.UserModel.findOne({ email });
  // }

  async findAllStudentNumber(): Promise<number | InternalServerErrorException> {
    //const [err, result] = await to(this.userRepository.count());
    const [err, result] = await to(
      this.userRepository
        .createQueryBuilder("user")
        .where("user.role = :role", { role: RolePermitted.student.toString() })
        .getCount()
    );
    if (err) return 100;
    return result;
  }
}
