import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelProviderService {

  constructor() { }

  /*Authentication*/
  public requestedUrl: string;
  public login: string = null;
  public password: string = null;
}
