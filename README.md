# survey-preview

Survey-preview is a web application for previewing custom forms for [Fieldtrip-Open](https://github.com/edina/fieldtrip-open).

## Instalation

In order to install this app, it is required nodeJS and npm running on your machine. If you meet these requirements, execute on your preferred
command-line the following instruction:

```bash
	$npm install
```

The file env.json provides different properties such as the server to retrieve a survey definition, the survey owner or
the pcapi version (e.g. pcapi.baseUrl, pcapi.userId or pcapi.version respectively). If this app is located under the same server and port
that hosts pcapi, leave pcapi.baseUrl empty. Otherwise, remember to enable CORS on that server. See [CORS](http://enable-cors.org/server.html) to
implement CORS on a specific platform.

## Run

If you don't have a server to host this app, we provide a simple nodejs http server that runs the app. Execute on your command-line:

```bash
	$npm run http-server-start
```

and open on your preferred browser the following URL:

[http://localhost:8080/app/index.html#/?sid=ID_OF_SURVEY](http://localhost:8080/app/index.html#/?sid=ID_OF_SURVEY)

Remember to replace the sid parameter value with the survey id that is hosted at your pcapi server.
