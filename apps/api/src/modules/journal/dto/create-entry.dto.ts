import { IsString, IsInt, Min, Max, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreateEntryDto {
    @IsString()
    @MinLength(3, { message: 'Описание ситуации слишком короткое' })
    situation: string;

    @IsString()
    @MinLength(1, { message: 'Автоматическая мысль не может быть пустой' })
    automaticThought: string;

    @IsInt()
    @Min(0, { message: 'Уровень веры не может быть меньше 0' })
    @Max(100, { message: 'Уровень веры не может быть больше 100' })
    beliefBefore: number;

    @IsOptional()
    @IsArray({ message: 'Искажения должны быть массивом' })
    @IsString({ each: true, message: 'Каждое искажение должно быть строкой' })
    distortions?: string[];

    @IsOptional()
    @IsString({ message: 'Рациональный ответ должен быть текстом' })
    rationalResponse?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    beliefAfter?: number;
}
