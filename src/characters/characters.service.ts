import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Character, CharacterResponse } from './types/character.type';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  async getCharacters(searchTerm?: string): Promise<Character[]> {
    let url = process.env.API_URL;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }

    let characters: CharacterResponse[] = [];
    do {
      const { data } = await this.httpService.axiosRef.get(url);
      characters = characters.concat(data.results);
      url = data.next;
    } while (url);

    return await this.getCharacterDetails(characters);
  }

  async getCharacterDetails(characters: CharacterResponse[]): Promise<Character[]> {
    return Promise.all(
      characters.map(async (character) => {
        const starships =
          character.starships && character.starships.length > 0
            ? await Promise.all(
                character.starships.map(async (url) => {
                  const { data } = await this.httpService.axiosRef.get(url);
                  return {
                    name: data?.name ?? '',
                    model: data?.model ?? '',
                    manufacturer: data?.manufacturer ?? '',
                    starship_class: data?.starship_class ?? '',
                  };
                }),
              )
            : [];

        const id = this.getIdFromUrl(character?.url ?? '');
        const image = await this.getCharacterImage(id);

        return {
          id,
          name: character.name,
          height: character.height,
          mass: character.mass,
          hair_color: character.hair_color,
          skin_color: character.skin_color,
          eye_color: character.eye_color,
          birth_year: character.birth_year,
          gender: character.gender,
          starships,
          image,
        };
      }),
    );
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\//);
    return match ? Number(match[1]) : null;
  }

  private async getCharacterImage(characterId: number): Promise<string> {
    const url = `${process.env.CHARACTER_API_URL}/${characterId}`;
    const response = await this.httpService.axiosRef.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    return imageBuffer.toString('base64');
  }
}
