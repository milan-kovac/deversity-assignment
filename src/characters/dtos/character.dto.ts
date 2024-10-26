import { ApiProperty } from '@nestjs/swagger';

export class StarshipDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiProperty({ type: String })
  manufacturer: string;

  @ApiProperty({ type: String })
  starship_class: string;
}

export class CharacterDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  height: string;

  @ApiProperty({ type: String })
  mass: string;

  @ApiProperty({ type: String })
  gender: string;

  @ApiProperty({ type: [StarshipDto] })
  starships: StarshipDto[];

  @ApiProperty({ type: String })
  image: string;
}
