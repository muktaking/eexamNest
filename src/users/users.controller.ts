import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getUserById(@Req() req): Promise<any> {
    return await this.userService.findOneUser(req.user.email);
  }

  @Get("all")
  async getAlltUsers(): Promise<any> {
    return await this.userService.findAllUsers();
  }

  // @Get("all")
  // async geAlltUsers(): Promise<any> {
  //   return await this.userService.findAllUsers();
  // }
}
