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

import { Observable }                                        from 'rxjs/Observable';

import { UserSongRatingDTO } from '../model/userSongRatingDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserSongRatingRestControllerService {

    protected basePath = 'https://localhost:8081';
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
     * create
     * 
     * @param dto dto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST7(dto: UserSongRatingDTO, observe?: 'body', reportProgress?: boolean): Observable<UserSongRatingDTO>;
    public createUsingPOST7(dto: UserSongRatingDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserSongRatingDTO>>;
    public createUsingPOST7(dto: UserSongRatingDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserSongRatingDTO>>;
    public createUsingPOST7(dto: UserSongRatingDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling createUsingPOST7.');
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

        return this.httpClient.post<UserSongRatingDTO>(`${this.basePath}/api/ratings`,
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
     * @param dto dto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUsingDELETE8(dto: UserSongRatingDTO, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUsingDELETE8(dto: UserSongRatingDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUsingDELETE8(dto: UserSongRatingDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUsingDELETE8(dto: UserSongRatingDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling deleteUsingDELETE8.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.delete<any>(`${this.basePath}/api/ratings`,
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
     * @param equal equal
     * @param greaterThanEqual greaterThanEqual
     * @param lessThanEqual lessThanEqual
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllUsingGET7(equal?: number, greaterThanEqual?: number, lessThanEqual?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<UserSongRatingDTO>>;
    public getAllUsingGET7(equal?: number, greaterThanEqual?: number, lessThanEqual?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserSongRatingDTO>>>;
    public getAllUsingGET7(equal?: number, greaterThanEqual?: number, lessThanEqual?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserSongRatingDTO>>>;
    public getAllUsingGET7(equal?: number, greaterThanEqual?: number, lessThanEqual?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (equal !== undefined && equal !== null) {
            queryParameters = queryParameters.set('equal', <any>equal);
        }
        if (greaterThanEqual !== undefined && greaterThanEqual !== null) {
            queryParameters = queryParameters.set('greaterThanEqual', <any>greaterThanEqual);
        }
        if (lessThanEqual !== undefined && lessThanEqual !== null) {
            queryParameters = queryParameters.set('lessThanEqual', <any>lessThanEqual);
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

        return this.httpClient.get<Array<UserSongRatingDTO>>(`${this.basePath}/api/ratings`,
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
     * getBySongId
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBySongIdUsingGET1(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<UserSongRatingDTO>>;
    public getBySongIdUsingGET1(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserSongRatingDTO>>>;
    public getBySongIdUsingGET1(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserSongRatingDTO>>>;
    public getBySongIdUsingGET1(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getBySongIdUsingGET1.');
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

        return this.httpClient.get<Array<UserSongRatingDTO>>(`${this.basePath}/api/ratings/song/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getByUserIdAndSongId
     * 
     * @param songId songId
     * @param userId userId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByUserIdAndSongIdUsingGET(songId: number, userId: number, observe?: 'body', reportProgress?: boolean): Observable<UserSongRatingDTO>;
    public getByUserIdAndSongIdUsingGET(songId: number, userId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserSongRatingDTO>>;
    public getByUserIdAndSongIdUsingGET(songId: number, userId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserSongRatingDTO>>;
    public getByUserIdAndSongIdUsingGET(songId: number, userId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (songId === null || songId === undefined) {
            throw new Error('Required parameter songId was null or undefined when calling getByUserIdAndSongIdUsingGET.');
        }

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getByUserIdAndSongIdUsingGET.');
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

        return this.httpClient.get<UserSongRatingDTO>(`${this.basePath}/api/ratings/${encodeURIComponent(String(userId))}/${encodeURIComponent(String(songId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getByUserId
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByUserIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<UserSongRatingDTO>>;
    public getByUserIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserSongRatingDTO>>>;
    public getByUserIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserSongRatingDTO>>>;
    public getByUserIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByUserIdUsingGET.');
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

        return this.httpClient.get<Array<UserSongRatingDTO>>(`${this.basePath}/api/ratings/user/${encodeURIComponent(String(id))}`,
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
    public updateUsingPUT8(dto: UserSongRatingDTO, observe?: 'body', reportProgress?: boolean): Observable<UserSongRatingDTO>;
    public updateUsingPUT8(dto: UserSongRatingDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserSongRatingDTO>>;
    public updateUsingPUT8(dto: UserSongRatingDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserSongRatingDTO>>;
    public updateUsingPUT8(dto: UserSongRatingDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling updateUsingPUT8.');
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

        return this.httpClient.put<UserSongRatingDTO>(`${this.basePath}/api/ratings`,
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
