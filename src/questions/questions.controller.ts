import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Role } from "src/roles.decorator";
import { RolesGuard } from "src/roles.guard";
import { RolePermitted } from "src/users/user.model";
import { editFileName, excelFileFilter } from "../utils/file-uploading.utils";
import { CreateQuestionDto } from "./create-question.dto";
import { StemValidationPipe } from "./pipe/stem-validation.pipe";
import { QuestionsService } from "./questions.service";
import { Stem } from "./stem.entity";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @Role(RolePermitted.mentor)
  async getAllQuestions() {
    return await this.questionService.findAllQuestions();
  }

  @Role(RolePermitted.moderator)
  @Get("/category/:id")
  async getQuestionsByCategory(@Param() categoryId) {
    return await this.questionService.findQuestionByFilter(
      "categoryId",
      categoryId.id
    );
  }
  @Post()
  @Role(RolePermitted.mentor)
  @UsePipes(ValidationPipe)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Body("stem", StemValidationPipe) stem: { stem: Stem[]; error: string },
    @Req() req
  ) {
    return await this.questionService.createQuestion(
      createQuestionDto,
      stem,
      req.user.id
    );
  }

  @Post("/files")
  @Role(RolePermitted.mentor)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/files",
        filename: editFileName,
      }),
      fileFilter: excelFileFilter,
    })
  )
  async createQuestionByUpload(
    @Req() req,
    @Body("category") category: string,
    @UploadedFile() file: string
  ) {
    return await this.questionService.createQuestionByUpload(
      req.user.id,
      category,
      file
    );
  }
}
