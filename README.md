# Songbook (Angular Client)

Angular application for frontend client of the [Songbook Manager API](https://github.com/przybandrzej/Songbook_Manager-API).

## Tools

* NodeJs - 12.8.2
* Angular CLI - 9.1.11
* Angular 9.1.12
* Swagger codegen - 2.14.4
* Angular Material - 9.0.0-beta.31

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component components/{component-name}` or `ng g c components/{component-name}` to generate a new component. 

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Swagger Codegen usage

In `swagger-codegen-cli` run `java -jar swagger-codegen-cli.jar generate -i {OpenAPI v2 specification} -l typescript-angular -o ..\src\app`, where `{OpenAPI v2 specification}` is a file or URL to the API documentation e.g. `http://localhost:8080/v2/api-docs`, to generate API communication services and model.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
