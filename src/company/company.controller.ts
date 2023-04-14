import { QueryDto } from "src/utils/pagination.utils";
import { CompanyService } from "src/company/company.service";
import { Company } from "src/company/entities/company.entity";
import { StandardResponse } from "src/utils/responseManager.utils";
import { CreateCompanyDto, CompanyDto, UpdateCompanyDto } from "src/company/dto/company.dto";

import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";

import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode,
  Controller,
  ParseUUIDPipe,
} from "@nestjs/common";

@Controller("company")
@ApiTags("Company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ description: "Create a new company", type: CreateCompanyDto })
  @ApiCreatedResponse({
    description: "company created successfully",
    type: CompanyDto,
  })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<StandardResponse<CompanyDto>> {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: "Company retrieved successfully", type: [CompanyDto] })
  findAll(@Query() query: QueryDto): Promise<StandardResponse<Company[]>> {
    return this.companyService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Company retrieved successfully", type: CompanyDto })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<CompanyDto>> {
    return this.companyService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Company Updated successfully", type: CompanyDto })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<StandardResponse<Company>> {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  @ApiNoContentResponse({
    description: "Company deleted successfully",
    type: StandardResponse<null>,
  })
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<StandardResponse<null>> {
    return this.companyService.remove(id);
  }
}
