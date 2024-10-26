import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { GetCharactersResponseDto } from './dtos/get.characters.response.dto';
import { CreateGenericResponse } from '../shared/responses/create.response';

@ApiTags('characters')
@Controller('characters')
@UseInterceptors(CacheInterceptor)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({
    summary: 'Get characters.',
  })
  @ApiResponse({ type: GetCharactersResponseDto })
  @Get()
  @CacheTTL(300000)
  async getCharacters(@Query('search') search?: string): Promise<GetCharactersResponseDto> {
    const characters = await this.charactersService.getCharacters(search);
    return CreateGenericResponse(characters);
  }
}
