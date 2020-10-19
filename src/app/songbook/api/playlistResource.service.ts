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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CreatePlaylistDTO } from '../model/createPlaylistDTO';
import { PlaylistDTO } from '../model/playlistDTO';
import { Resource } from '../model/resource';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PlaylistResourceService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * addSong
     * 
     * @param id id
     * @param songId songId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSongUsingPATCH(id: number, songId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addSongUsingPATCH(id: number, songId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addSongUsingPATCH(id: number, songId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addSongUsingPATCH(id: number, songId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling addSongUsingPATCH.');
        }

        if (songId === null || songId === undefined) {
            throw new Error('Required parameter songId was null or undefined when calling addSongUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.patch<any>(`${this.basePath}/api/playlists/${encodeURIComponent(String(id))}/add-song/${encodeURIComponent(String(songId))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * create
     * 
     * @param dto dto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST2(dto: CreatePlaylistDTO, observe?: 'body', reportProgress?: boolean): Observable<PlaylistDTO>;
    public createUsingPOST2(dto: CreatePlaylistDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlaylistDTO>>;
    public createUsingPOST2(dto: CreatePlaylistDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlaylistDTO>>;
    public createUsingPOST2(dto: CreatePlaylistDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling createUsingPOST2.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<PlaylistDTO>(`${this.basePath}/api/playlists`,
            dto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * delete
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUsingDELETE2(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUsingDELETE2(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUsingDELETE2(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUsingDELETE2(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE2.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/api/playlists/id/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * downloadPlaylistPdfSongbook
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public downloadPlaylistPdfSongbookUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Resource>;
    public downloadPlaylistPdfSongbookUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resource>>;
    public downloadPlaylistPdfSongbookUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resource>>;
    public downloadPlaylistPdfSongbookUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling downloadPlaylistPdfSongbookUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Resource>(`${this.basePath}/api/playlists/download/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAll
     * 
     * @param includePrivate include_private
     * @param limit limit
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllUsingGET3(includePrivate?: boolean, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PlaylistDTO>>;
    public getAllUsingGET3(includePrivate?: boolean, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlaylistDTO>>>;
    public getAllUsingGET3(includePrivate?: boolean, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlaylistDTO>>>;
    public getAllUsingGET3(includePrivate?: boolean, limit?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includePrivate !== undefined && includePrivate !== null) {
            queryParameters = queryParameters.set('include_private', <any>includePrivate);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<PlaylistDTO>>(`${this.basePath}/api/playlists`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdUsingGET3(id: number, observe?: 'body', reportProgress?: boolean): Observable<PlaylistDTO>;
    public getByIdUsingGET3(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlaylistDTO>>;
    public getByIdUsingGET3(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlaylistDTO>>;
    public getByIdUsingGET3(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByIdUsingGET3.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<PlaylistDTO>(`${this.basePath}/api/playlists/id/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getByName
     * 
     * @param name name
     * @param includePrivate include_private
     * @param limit limit
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByNameUsingGET1(name: string, includePrivate?: boolean, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PlaylistDTO>>;
    public getByNameUsingGET1(name: string, includePrivate?: boolean, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlaylistDTO>>>;
    public getByNameUsingGET1(name: string, includePrivate?: boolean, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlaylistDTO>>>;
    public getByNameUsingGET1(name: string, includePrivate?: boolean, limit?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling getByNameUsingGET1.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includePrivate !== undefined && includePrivate !== null) {
            queryParameters = queryParameters.set('include_private', <any>includePrivate);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<PlaylistDTO>>(`${this.basePath}/api/playlists/name/${encodeURIComponent(String(name))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getByOwnerId
     * 
     * @param id id
     * @param includePrivate include_private
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByOwnerIdUsingGET(id: number, includePrivate?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<PlaylistDTO>>;
    public getByOwnerIdUsingGET(id: number, includePrivate?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlaylistDTO>>>;
    public getByOwnerIdUsingGET(id: number, includePrivate?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlaylistDTO>>>;
    public getByOwnerIdUsingGET(id: number, includePrivate?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByOwnerIdUsingGET.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includePrivate !== undefined && includePrivate !== null) {
            queryParameters = queryParameters.set('include_private', <any>includePrivate);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<PlaylistDTO>>(`${this.basePath}/api/playlists/ownerId/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * removeSong
     * 
     * @param id id
     * @param songId songId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeSongUsingPATCH(id: number, songId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public removeSongUsingPATCH(id: number, songId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public removeSongUsingPATCH(id: number, songId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public removeSongUsingPATCH(id: number, songId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling removeSongUsingPATCH.');
        }

        if (songId === null || songId === undefined) {
            throw new Error('Required parameter songId was null or undefined when calling removeSongUsingPATCH.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.patch<any>(`${this.basePath}/api/playlists/${encodeURIComponent(String(id))}/remove-song/${encodeURIComponent(String(songId))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * update
     * 
     * @param dto dto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUsingPUT2(dto: PlaylistDTO, observe?: 'body', reportProgress?: boolean): Observable<PlaylistDTO>;
    public updateUsingPUT2(dto: PlaylistDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlaylistDTO>>;
    public updateUsingPUT2(dto: PlaylistDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlaylistDTO>>;
    public updateUsingPUT2(dto: PlaylistDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling updateUsingPUT2.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<PlaylistDTO>(`${this.basePath}/api/playlists`,
            dto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
