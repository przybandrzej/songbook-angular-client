java -jar swagger-codegen-cli.jar generate -i http://localhost:8081/v2/api-docs -l typescript-angular -o ..\src\app --additional-properties ngVersion=9.0.0

$file = '..\src\api\api\songRestControllerService.service.ts'
$find = 'let formParams: { append(param: string, value: any): void; };'
$replace = 'let formParams: { append(param: string, value: any): void | HttpParams; };'

(Get-Content $file).replace($find, $replace) | Set-Content $file
