import { ApiResponseProperty } from '@nestjs/swagger';
import { CharacterDto } from './character.dto';

export class GetCharactersResponseDto {
  @ApiResponseProperty({
    type: CharacterDto,
  })
  data: CharacterDto[];
}
