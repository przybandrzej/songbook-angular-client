/**
 * Songbook API
 * Tourist songs application
 *
 * OpenAPI spec version: 1.5.5
 * Contact: andrzej.przybysz01@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CreateLineDTO } from './createLineDTO';


/**
 * Class representing a DTO for creating verses of songs.
 */
export interface CreateVerseDTO { 
    chorus?: boolean;
    /**
     * Order of the verse in the song
     */
    order?: number;
    lines?: Array<CreateLineDTO>;
}
