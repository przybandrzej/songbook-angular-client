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

import { UniversalCreateDTO } from '../model/universalCreateDTO';
import { UserDTO } from '../model/userDTO';
import { UserRoleDTO } from '../model/userRoleDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserRoleResourceService {

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
     * create
     * 
     * @param userRoleDto userRoleDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST6(userRoleDto: UniversalCreateDTO, observe?: 'body', reportProgress?: boolean): Observable<UserRoleDTO>;
    public createUsingPOST6(userRoleDto: UniversalCreateDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserRoleDTO>>;
    public createUsingPOST6(userRoleDto: UniversalCreateDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserRoleDTO>>;
    public createUsingPOST6(userRoleDto: UniversalCreateDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userRoleDto === null || userRoleDto === undefined) {
            throw new Error('Required parameter userRoleDto was null or undefined when calling createUsingPOST6.');
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

        return this.httpClient.post<UserRoleDTO>(`${this.basePath}/api/user_roles`,
            userRoleDto,
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
    public deleteUsingDELETE7(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUsingDELETE7(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUsingDELETE7(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUsingDELETE7(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE7.');
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

        return this.httpClient.delete<any>(`${this.basePath}/api/user_roles/id/${encodeURIComponent(String(id))}`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllUsingGET7(observe?: 'body', reportProgress?: boolean): Observable<Array<UserRoleDTO>>;
    public getAllUsingGET7(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserRoleDTO>>>;
    public getAllUsingGET7(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserRoleDTO>>>;
    public getAllUsingGET7(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<UserRoleDTO>>(`${this.basePath}/api/user_roles`,
            {
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
    public getByIdUsingGET7(id: number, observe?: 'body', reportProgress?: boolean): Observable<UserRoleDTO>;
    public getByIdUsingGET7(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserRoleDTO>>;
    public getByIdUsingGET7(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserRoleDTO>>;
    public getByIdUsingGET7(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByIdUsingGET7.');
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

        return this.httpClient.get<UserRoleDTO>(`${this.basePath}/api/user_roles/id/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getByNameSearchQuery
     * 
     * @param searchQuery searchQuery
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByNameSearchQueryUsingGET(searchQuery: string, observe?: 'body', reportProgress?: boolean): Observable<Array<UserRoleDTO>>;
    public getByNameSearchQueryUsingGET(searchQuery: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserRoleDTO>>>;
    public getByNameSearchQueryUsingGET(searchQuery: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserRoleDTO>>>;
    public getByNameSearchQueryUsingGET(searchQuery: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (searchQuery === null || searchQuery === undefined) {
            throw new Error('Required parameter searchQuery was null or undefined when calling getByNameSearchQueryUsingGET.');
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

        return this.httpClient.get<Array<UserRoleDTO>>(`${this.basePath}/api/user_roles/name/${encodeURIComponent(String(searchQuery))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getUsersByUserRoleId
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUsersByUserRoleIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<UserDTO>>;
    public getUsersByUserRoleIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserDTO>>>;
    public getUsersByUserRoleIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserDTO>>>;
    public getUsersByUserRoleIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getUsersByUserRoleIdUsingGET.');
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

        return this.httpClient.get<Array<UserDTO>>(`${this.basePath}/api/user_roles/id/${encodeURIComponent(String(id))}/users`,
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
     * @param userRoleDto userRoleDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUsingPUT6(userRoleDto: UserRoleDTO, observe?: 'body', reportProgress?: boolean): Observable<UserRoleDTO>;
    public updateUsingPUT6(userRoleDto: UserRoleDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserRoleDTO>>;
    public updateUsingPUT6(userRoleDto: UserRoleDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserRoleDTO>>;
    public updateUsingPUT6(userRoleDto: UserRoleDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userRoleDto === null || userRoleDto === undefined) {
            throw new Error('Required parameter userRoleDto was null or undefined when calling updateUsingPUT6.');
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

        return this.httpClient.put<UserRoleDTO>(`${this.basePath}/api/user_roles`,
            userRoleDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
