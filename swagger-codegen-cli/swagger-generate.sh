java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs -l typescript-angular -o ../src/app/songbook --additional-properties ngVersion=9.0.0
sed -i 's/let formParams: { append(param: string, value: any): void; };/let formParams: { append(param: string, value: any): any; };/g' ../src/app/songbook/api/songResource.service.ts
