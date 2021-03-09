import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get()
  // @UseGuards(AuthGuard("jwt"))
  // async getUserById(@Req() req): Promise<any> {
  //   return await this.userService.findUserById(req.user.id);
  // }

  @Get("all")
  async getAlltUsers(): Promise<any> {
    return await this.userService.findAllUsers();
  }

  // @Get("all")
  // async geAlltUsers(): Promise<any> {
  //   return await this.userService.findAllUsers();
  // }
}
