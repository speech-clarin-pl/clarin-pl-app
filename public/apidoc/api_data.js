define({ "api": [
  {
    "type": "put",
    "url": "/repoFiles/runSpeechDiarization/:containerId",
    "title": "Diaryzacja",
    "description": "<p>Narzędzie diaryzacji. Po wykonaniu zapytania należy poczekać na zakończenie pracy. Po zakończeniu serwer zapisze rezultaty w kontenerze o danym ID. Aby ściągnąć rezultaty działania narzędzia należy skorzystać z osobnego zapytania API. W międzyczasie możesz odpytywać serwer na temat statusu wykonania tego narzędzia wykorzystując containerId w osobnym zapytaniu API.</p>",
    "name": "DIATool",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu. Możesz go również znaleźć w graficznym interfejsie użytkownika</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>informacja o zakończeniu działania</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toolType",
            "description": "<p>zwraca flagę &quot;DIA&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "DIAsegments",
            "description": "<p>zwraca segmenty diaryzacji w postaci JSON. Aby pobrać wynik w innym formacie (CTM lub TextGrid) należy skorzystać z osobnego zapytania API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Diaryzacja zakończona sukcesem!',\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n  \"toolType\": \"DIA\",\n  \"VADSegments\": [\n                     {\n                         \"startTime\":0.68,\n                         \"endTime\":2.74,\n                         \"editable\":true,\n                         \"color\":\"#394b55\",\n                         \"labelText\":\"1\"\n                     },\n                     {\n                         \"startTime\":2.74,\n                         \"endTime\":4.62,\n                         \"editable\":true,\n                         \"color\":\"#394b55\",\n                         \"labelText\":\"2\"\n                     },\n                  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ],
        "503": [
          {
            "group": "503",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Gdy coś pójdzie nie tak z usługą</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "put",
    "url": "/repoFiles/runSpeechRecognition/:containerId",
    "title": "Rozpoznawanie mowy",
    "description": "<p>Narzędzie rozpoznaje automatycznie mowę z wgranego pliku. Po wykonaniu zapytania należy poczekać na zakończenie pracy. Po zakończeniu serwer zapisze rezultaty w kontenerze o danym ID. Aby ściągnąć rezultaty działania narzędzia należy skorzystać z osobnego zapytania API. W międzyczasie możesz odpytywać serwer na temat statusu wykonania tego narzędzia korzystając z osobnego zapytania API.</p>",
    "name": "RECTool",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu. Możesz go również znaleźć w graficznym interfejsie użytkownika</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>that this tool finished working</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toolType",
            "description": "<p>zawiera flage &quot;REC&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Rozpoznawanie mowy zostało zakończone!',\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n  \"toolType\": \"REC\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Serwer",
            "description": "<p>error</p>"
          }
        ],
        "503": [
          {
            "group": "503",
            "optional": false,
            "field": "Service",
            "description": "<p>Unavailable Gdy coś pójdzie nie tak z usługą rozpoznawania</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "put",
    "url": "/repoFiles/runG2P'",
    "title": "Uruchamia Graphen to Phonem (G2P)",
    "description": "<p>Uruchamia usługę G2P</p>",
    "name": "RunG2P",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "words",
            "description": "<p>słowa do tłumaczenia - każde w nowej linii</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alphabet",
            "description": "<p>rodzaj alfabetu, może być alpha lub sampa lub ipa</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "containerId",
            "optional": false,
            "field": "Identyfikator",
            "description": "<p>kontenera</p>"
          },
          {
            "group": "Success 200",
            "type": "newName",
            "optional": false,
            "field": "Nowa",
            "description": "<p>nazwa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'G2P zakończone powodzeniem',\n  \"alphabet\": \"alpha\",\n  \"g2pResults\": \"ala ma kota\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "put",
    "url": "/repoFiles/runKWS/:containerId'",
    "title": "Uruchamia keyword detection (KWS)",
    "description": "<p>Uruchamia usługę KWS</p>",
    "name": "RunKWS",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>identyfikator kontenera na ktorym ma byc przeprowadzona usługa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>słowa kluczowe do wyszukania</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "containerId",
            "optional": false,
            "field": "Identyfikator",
            "description": "<p>kontenera</p>"
          },
          {
            "group": "Success 200",
            "type": "newName",
            "optional": false,
            "field": "Nowa",
            "description": "<p>nazwa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'KWS zakończone powodzeniem',\n  \"containerId\": \"60c4a68bbf17b2778c0b56be\",\n  \"kwsResults\": \"celnik 0.74 0.22 -178.839\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "put",
    "url": "/repoFiles/runSpeechSegmentation/:containerId",
    "title": "Segmentacja",
    "description": "<p>Narzędzie segmentacji. Dla krótkich nagrań (poniżej 0.5MB) uruchamiany jest algorytm forcealign. Dla dłuższych plików segmentalign. Usługa wymaga uruchomienia najpierw usługi rozpoznawania. Po wykonaniu zapytania należy poczekać na zakończenie pracy. Po zakończeniu serwer zapisze rezultaty w kontenerze o danym ID. Aby ściągnąć rezultaty działania narzędzia należy skorzystać z osobnego zapytania API. W międzyczasie możesz odpytywać serwer na temat statusu wykonania tego narzędzia korzystając z osobnego zapytania API.</p>",
    "name": "SEGTool",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu. Możesz go również znaleźć w graficznym interfejsie użytkownika</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>informacja o zakończeniu działania</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toolType",
            "description": "<p>zawiera flage &quot;REC&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Segmentacja została wykonana pomyślnie',\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n  \"toolType\": \"SEG\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ],
        "503": [
          {
            "group": "503",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Gdy coś pójdzie nie tak z usługą segmentacji</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "put",
    "url": "/repoFiles/runSpeechVAD/:containerId",
    "title": "Detekcja mowy",
    "description": "<p>Narzędzie detekcji mowy. Po wykonaniu zapytania należy poczekać na zakończenie pracy. Po zakończeniu serwer zapisze rezultaty w kontenerze. Aby ściągnąć rezultaty działania narzędzia należy skorzystać z osobnego zapytania API. W międzyczasie możesz odpytywać serwer na temat statusu wykonania tego narzędzia korzystając z containerId w osobnym zapytaniu API.</p>",
    "name": "VADTool",
    "group": "Narzędzia",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu. Możesz go również znaleźć w graficznym interfejsie użytkownika</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>informacja o zakończeniu działania</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator zasobu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toolType",
            "description": "<p>zwraca flagę &quot;VAD&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "VADSegments",
            "description": "<p>zwraca segmenty detekcji w postaci JSON. Aby pobrać wynik w innym formacie (CTM lub TextGrid) należy skorzystać z osobnego zapytania API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Zakończono detekcję mowy!',\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n  \"toolType\": \"VAD\",\n  \"VADSegments\": [\n                     {\n                         \"startTime\":0.68,\n                         \"endTime\":2.74,\n                         \"editable\":true,\n                         \"color\":\"#394b55\",\n                         \"labelText\":\"speech\"\n                     },\n                     {\n                         \"startTime\":2.74,\n                         \"endTime\":5.97,\n                         \"editable\":true,\n                         \"color\":\"#394b55\",\n                         \"labelText\":\"speech\"\n                     }\n                   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ],
        "503": [
          {
            "group": "503",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Gdy coś pójdzie nie tak z usługą</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Narzędzia"
  },
  {
    "type": "post",
    "url": "/repoFiles/createNewSession/:projectId",
    "title": "Tworzenie sesji",
    "description": "<p>Tworzy nową sesje (folder) w istniejącym projekcie</p>",
    "name": "CREATESession",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionName",
            "description": "<p>Nazwa nowo tworzonej sesji</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Identyfikator projektu w którym ma być stworzona sesja</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że 'Nowa sesja została utworzona!'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionName",
            "description": "<p>Nazwa nowo stworzonej sesji</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID nowo stworzonej sesji</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"message\": 'Nowa sesja została utworzona!',\n  \"sessionName\": \"Nowa sesja\",\n  \"id\": \"5f58a92dfa006c8aed96f846\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne zapytanie</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "put",
    "url": "/repoFiles/changeContainerName/:containerId'",
    "title": "Zmiana nazwy kontenera",
    "description": "<p>Zmienia nazwę kontenera</p>",
    "name": "ChangeContainerName",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newName",
            "description": "<p>Nowa nazwa</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "containerId",
            "optional": false,
            "field": "Identyfikator",
            "description": "<p>kontenera</p>"
          },
          {
            "group": "Success 200",
            "type": "newName",
            "optional": false,
            "field": "Nowa",
            "description": "<p>nazwa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Zmiana nazwy zakończona sukcesem!',\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n  \"newName\": \"Nowa Nazwa\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/changeSessionName/:sessionId",
    "title": "Zmiana nazwy sesji",
    "description": "<p>Zmienia nazwę sesji</p>",
    "name": "ChangeSessionName",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>id sesji której nazwe chcemy zmienić</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newName",
            "description": "<p>nowa nazwa sesji</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>że zmiana przebiegła pomyślnie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>id zmienianej sesji</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newName",
            "description": "<p>nowa nazwa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Zmiana nazwy sesji sukcesem!\",\n   \"sessionId\": \"60ddf31aa715f3fd9b544c50\",\n   \"newName\": \"zmienionaNazwa123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>nie znaleziono sesji o danym ID</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/createCorpus/:projectId",
    "title": "Tworzenie korpusu",
    "description": "<p>Wywołanie powoduje inicjalizację procesu tworzenia korpusu w formacie EMU-SDMS i zapisuje go na serwerze w postaci pliku ZIP. Korpus jest tworzony z plików dla których wykonane zostały wszystkie poziomy anotacji (VAD, DIA, REC oraz SEG). Proces może trać dłuższy czas w zależności od ilości plików w projekcie. Po zakończeniu możesz ściągnąć korpus za pomocą osobnego zapytania API.</p>",
    "name": "CreateCorpus",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Identyfikator projektu dla którego tworzony jest korpus. Możesz go odnaleźć w interfejsie użytkownika bądź skorzystać z domyślnego projektu którego ID jest zwracane podczas rejestracji.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że korpus został utworzony i możesz go ściągnąć.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Tworzenie korpusu zakończone sukcesem. Możesz go ściągnąć.',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>Twoje pliki nie zawierają wszystkich poziomów anotacji lub coś poszło nie tak na serwerze</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "post",
    "url": "/projectsList/addProject",
    "title": "Tworzenie Projektu",
    "description": "<p>Tworzenie nowego projektu na potrzeby budowy nowego korpusu. Pliki w projekcie zorganizowane są w sesje. Podczas tworzenia projektu, tworzona jest domyślna sesja oraz sesja demo z przykładowymi plikami.</p>",
    "name": "CreateProject",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectName",
            "description": "<p>Nazwa projektu</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że projekt został utworzony.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>Informacje o nowym projekcie w postaci JSON.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"message\": 'Projekt został utworzony!',\n  \"project\": { \n               sessionIds: [\"5fec2f1082a28b3663a90845\", \"5fec2f1082a28b3663a90846\"],\n               _id: 5fe99be5d831b7c009e36fbb,\n               name: 'sampleProject',\n               owner: 5fe39a36daa13f1fa38e1e06,\n               projectCreated: 'December 28th 2020, 9:48:37 am',\n               createdAt: 2020-12-28T08:48:37.558Z,\n               updatedAt: 2020-12-28T08:48:37.558Z,\n     \n             }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błedne polecenie</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ValidationFailed",
            "description": "<p>Błędna nazwa projektu</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/projectsList.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "delete",
    "url": "/repoFiles/deleteSession/:sessionId",
    "title": "Usuwanie sesji",
    "description": "<p>Usuwa sesje wraz z jej zawartością</p>",
    "name": "DELETESession",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Id usuwanej sesji</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'Sesja wraz z awartością została usunięta!'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Id usuniętej sesji</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Sesja wraz z awartością została usunięta!',\n  \"sessionId\": \"5f58a92dfa006c8aed96f846\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne zapytanie</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Sesji nie znaleziono</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "delete",
    "url": "/repoFiles/delete/:containerId",
    "title": "Usuwanie kontenera",
    "description": "<p>Usuwa kontener oraz wszystko co z nim związane (pliki, anotacje, wpisy w bazie danych).</p>",
    "name": "DELETEcontainer",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera który chcesz usunąć</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Kontener został usunięty!</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Id kontenera który został usunięty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Id sesji do której należy kontener</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Kontener został usunięty!',\n  \"sessionId\": \"5f58a92dfa006c8aed96f846\",\n  \"containerId\": \"5f58a92dfa006c8aed96f846\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Nie znaleziono kontenera o danym Id</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Bład serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/downloadCorpus/:projectId",
    "title": "Pobierz korpus EMU",
    "description": "<p>Gdy korpus jest stworzony, możesz go pobrać na dysk twardy</p>",
    "name": "DownloadCorpus",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Identyfikator projektu dla którego chcesz pobrać korpus. Znajdziesz go również w interfejsie użytkownika.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "korpus",
            "description": "<p>w formacie ZIP</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>nie znaleziono projektu o danym ID</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "GET",
    "url": "/repoFiles/download/:containerId/:fileType",
    "title": "Pobierz wyniki",
    "description": "<p>Za pomocą tego zapytania możesz pobrać efekty pracy narzędzi automatycznych. Oprócz tego możesz pobrać oryginalnie wgrany plik oraz plik przekonwertowany do formatu WAV 16000 Hz, 16bits.</p>",
    "name": "GETOutputFile",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera dla którego chcesz pobrać wynik.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileType",
            "description": "<p>Wskazanie formatu w jakim chcesz pobrać wynik. <h3>Pliki audio</h3><ul><li>&quot;oryginalAudio&quot;: Pobranie pliku który został wysłany na serwer.</li><li>&quot;audio&quot; : pobranie pliku przekonwertowanego do PCM 16000Hz 8bits</li></ul><h3>Detekcja mowy (VAD) </h3><ul><li>&quot;VADctm&quot;: Wynik działania VAD w formacie CTM</li><li>&quot;VADtextGrid&quot;: Wynik działania VAD w formacie TextGrid</li><li>&quot;VADJSON&quot;: Wynik działania VAD w formacie JSON</li></ul><h3>Diaryzacja (DIA)</h3><ul><li>&quot;DIActm&quot;: Wynik działania DIA w formacie CTM</li><li>&quot;DIAtextGrid&quot;: Wynik działania DIA w formacie TextGrid.</li><li>&quot;DIAJSON&quot;: Wynik działania DIA w formacie JSON.</li></ul><h3>Rozpoznawanie mowy (REC)</h3><ul><li>&quot;JSONTranscript&quot;: Wynik działania REC w formacie JSCON</li><li>&quot;TXTTranscript&quot;: Wynik działania REC w formacie TXT.</li></ul><h3>Segmentacja (SEG)</h3><ul><li>&quot;SEGctm&quot;: Wynik działania SEG w formacie CTM</li><li>&quot;SEGtextGrid&quot;: Wynik działania SEG w formacie TextGrid.</li><li>&quot;EMUJSON&quot;: Wynik działania SEG w formacie EMU-SDMS. Plik tego typu jest tworzony tylko podczas tworzenia korpusu z projektu.</li></ul></p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "File",
            "description": "<p>zwraca żądany plik</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK input 1 0.120 7.610 speech",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Nie znaleziono kontenera o danym ID</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Coś poszło nie tak na serwerze</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/getProjectAssets/:projectId",
    "title": "Zawartość repozytorium",
    "description": "<p>Zapytanie zwraca zawartość danego projektu w postaci listy sesji oraz kontenerów</p>",
    "name": "GETrepoassets",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Identyfikator projektu</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Pliki dla tego projektu zostały pobrane!</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "corpusCreatedAt",
            "description": "<p>Data ostatnio stworzonego korpusu z danego projektu</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "sessions",
            "description": "<p>Lista sesji</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "containers",
            "description": "<p>Lista kontenerów</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"message\": 'Nowa sesja została utworzona!',\n     \"corpusCreatedAt\": \"2021-04-03 12:03:33 pm\"\n     \"sessions\": [\n      {\n          \"id\": \"5fdce8d1673bf111427d73ba\",\n          \"sessionName\": \"demo\",\n          \"ifSelected\": false,\n          \"containers\": [\n              \"5fdce8d1673bf111427d73bb\",\n              \"5fdce8d1673bf111427d73bc\",\n              \"5fdce8d1673bf111427d73bd\",\n              \"5fdce8d1673bf111427d73be\",\n              \"5fdce8d1673bf111427d73bf\"\n          ]\n      },\n      {\n          \"id\": \"5fdd0af7673bf111427d73c0\",\n          \"sessionName\": \"\\\"nowaSesjaAPI\\\"\",\n          \"ifSelected\": false,\n          \"containers\": []\n      }],\n     \"containers\": [\n      {\n          \"ifVAD\": true,\n          \"ifDIA\": true,\n          \"ifREC\": true,\n          \"ifSEG\": true,\n          \"errorMessage\": \"\",\n          \"_id\": \"5fdce8d1673bf111427d73bb\",\n          \"fileName\": \"celnik-1189e21a.wav\",\n          \"containerName\": \"celnik\",\n          \"oryginalFileName\": \"celnik.wav\",\n          \"size\": \"214078\",\n          \"owner\": \"5fc4d01a9045bb531c0b01a4\",\n          \"project\": \"5fdce8d1673bf111427d73b8\",\n          \"session\": \"5fdce8d1673bf111427d73ba\",\n          \"statusVAD\": \"done\",\n          \"statusDIA\": \"done\",\n          \"statusREC\": \"done\",\n          \"statusSEG\": \"done\",\n          \"VADUserSegments\": [\n              {\n                  \"startTime\": 0.68,\n                  \"endTime\": 2.74,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"speech\"\n              },\n              {\n                  \"startTime\": 2.74,\n                  \"endTime\": 5.97,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"speech\"\n              }\n          ],\n          \"DIAUserSegments\": [\n              {\n                  \"startTime\": 0.68,\n                  \"endTime\": 2.74,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"1\"\n              },\n              {\n                  \"startTime\": 2.74,\n                  \"endTime\": 4.62,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"2\"\n              },\n              {\n                  \"startTime\": 4.62,\n                  \"endTime\": 5.97,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"3\"\n              }\n          ],\n          \"RECUserSegments\": [],\n          \"SEGUserSegments\": [],\n          \"__v\": 0,\n          \"createdAt\": \"2020-12-18T17:37:21.828Z\",\n          \"updatedAt\": \"2020-12-18T17:37:21.828Z\"\n      },\n      {\n          \"ifVAD\": true,\n          \"ifDIA\": true,\n          \"ifREC\": false,\n          \"ifSEG\": false,\n          \"errorMessage\": \"\",\n          \"_id\": \"5fdce8d1673bf111427d73bc\",\n          \"fileName\": \"kleska-29d61ce0.wav\",\n          \"containerName\": \"kleska\",\n          \"oryginalFileName\": \"kleska.wav\",\n          \"size\": \"274078\",\n          \"owner\": \"5fc4d01a9045bb531c0b01a4\",\n          \"project\": \"5fdce8d1673bf111427d73b8\",\n          \"session\": \"5fdce8d1673bf111427d73ba\",\n          \"statusVAD\": \"done\",\n          \"statusDIA\": \"done\",\n          \"statusREC\": \"ready\",\n          \"statusSEG\": \"ready\",\n          \"VADUserSegments\": [\n              {\n                  \"startTime\": 1.31,\n                  \"endTime\": 7.81,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"speech\"\n              }\n          ],\n          \"DIAUserSegments\": [\n              {\n                  \"startTime\": 1.31,\n                  \"endTime\": 4.69,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"3\"\n              },\n              {\n                  \"startTime\": 4.68,\n                  \"endTime\": 6.18,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"1\"\n              },\n              {\n                  \"startTime\": 6.18,\n                  \"endTime\": 7.81,\n                  \"editable\": true,\n                  \"color\": \"#394b55\",\n                  \"labelText\": \"2\"\n              }\n          ],\n*            \"RECUserSegments\": [],\n          \"SEGUserSegments\": [],\n          \"__v\": 0,\n          \"createdAt\": \"2020-12-18T17:37:21.828Z\",\n          \"updatedAt\": \"2020-12-18T17:37:21.828Z\"\n      }]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne zapytanie</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "IntenalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/getContainerInfo/:containerId",
    "title": "Info kontenera",
    "description": "<p>Zwraca metadane danego kontenera</p>",
    "name": "GetContainerInfo",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "repoStats",
            "description": "<p>statystyki użycia repozytorium</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n     {\n         \"container\": {\n             \"ifVAD\": false,\n             \"ifDIA\": false,\n             \"ifREC\": false,\n             \"ifSEG\": false,\n             \"errorMessage\": \"\",\n             \"_id\": \"60df2e582978b3ba4d8303d8\",\n             \"fileName\": \"testowyplik-f5001650.wav\",\n             \"containerName\": \"testowyplik\",\n             \"oryginalFileName\": \"testowyplik.mp3\",\n             \"size\": 2694606,\n             \"sizeOryginal\": 168408,\n             \"owner\": \"60ddca14f2e04bbdec0aa893\",\n             \"project\": \"60df2e392978b3ba4d8303d0\",\n             \"session\": \"60df2e4d2978b3ba4d8303d7\",\n             \"statusVAD\": \"ready\",\n             \"statusDIA\": \"ready\",\n             \"statusREC\": \"ready\",\n             \"statusSEG\": \"ready\",\n             \"VADUserSegments\": [],\n             \"DIAUserSegments\": [],\n             \"RECUserSegments\": [],\n             \"SEGUserSegments\": [],\n             \"createdAt\": \"2021-07-02T15:18:48.730Z\",\n             \"updatedAt\": \"2021-07-02T15:18:48.730Z\",\n         }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne zapytanie</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/projectsList",
    "title": "Pobranie listy projektów",
    "description": "<p>Zwraca listę projektów stworzonych przez zalogowanego użytkownika</p>",
    "name": "GetProjectList",
    "group": "Pliki",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że projekt został utworzony.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "projects",
            "description": "<p>tablica z metadanymi projektów użytkownika</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n   \"message\": \"Lista projektów pobrana!\",\n   \"projects\": [\n       {\n           \"sessionIds\": [\n               \"60dde3c32c7c40e8baedcaf2\",\n               \"60dde3c32c7c40e8baedcaf3\"\n           ],\n           \"_id\": \"60dde3c32c7c40e8baedcaf1\",\n           \"name\": \"Zmieniona nazwa nowego projektu XYZ\",\n           \"owner\": \"60ddca14f2e04bbdec0aa893\",\n           \"projectCreated\": \"July 1st 2021, 5:48:19 pm\",\n           \"createdAt\": \"2021-07-01T15:48:19.874Z\",\n           \"updatedAt\": \"2021-07-01T15:54:08.572Z\",\n       },\n       {\n           \"sessionIds\": [\n               \"60ddca1bf2e04bbdec0aa896\",\n               \"60ddca1bf2e04bbdec0aa897\"\n           ],\n           \"_id\": \"60ddca1bf2e04bbdec0aa894\",\n           \"name\": \"DOMYŚLNY PROJEKT\",\n           \"owner\": \"60ddca14f2e04bbdec0aa893\",\n           \"projectCreated\": \"July 1st 2021, 3:58:51 pm\",\n           \"createdAt\": \"2021-07-01T13:58:51.766Z\",\n           \"updatedAt\": \"2021-07-01T13:58:51.776Z\",\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/projectsList.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "get",
    "url": "/repoFiles/getRepoStats/:projectId",
    "title": "Statystyki repozytorium",
    "description": "<p>Zwraca statystyki użycia repozytorium</p>",
    "name": "GetRepoStats",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Identyfikator projektu</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "repoStats",
            "description": "<p>statystyki użycia repozytorium</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"repoStats\": {\n        \"containersNumber\": 7,\n        \"weightOfOryginal\": 2884128,\n        \"weightOfConverted\": 1855274,\n        \"totalWeight\": 4739402\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne zapytanie</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "put",
    "url": "/repoFiles/moveContainerToSession/:containerId",
    "title": "Przenoszenie kontenera",
    "description": "<p>Przenoszenie kontenera do innej sesji</p>",
    "name": "MoveContainer",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>id kontenera ktory chcemy przenieść</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>id sesji do której chcemy przenieść kontener</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>że kontener został przeniesiony</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>id kontenera przenoszonego</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>id sesji do ktorej zostal przeniesiony kontener</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>nie znaleziono kontenera o danym ID</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "delete",
    "url": "/projectsList/removeProject/:projectId",
    "title": "Usuwanie Projektu",
    "description": "<p>Wywołanie powoduje skasowanie projektu wraz z jego zawartością. Używaj z rozwagą gdyż po usunięciu nie ma możliwości odzyskania danych.</p>",
    "name": "RemoveProject",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Id projektu do usunięcia</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że projekt został usunięty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Id usuniętego projektu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Projekt usunięty!',\n  \"projectId\": 5fe99be5d831b7c009e36fbb\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Nie znaleziono projektu o zadanym Id</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Brak uprawnień</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Nie znaleziono projektu o zadanym Id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/projectsList.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "post",
    "url": "/repoFiles/uploadFile",
    "title": "Wgrywanie pliku",
    "description": "<p>Wgranie pliku audio lub transkrypcji na serwer. W przypadku pliku audio należy podać id sesji do której wgrany będzie plik. W przypadku pliku transkrypcji (txt) należy podać dodatkowo id kontenera którego dotyczy.</p>",
    "name": "UPLOADfile",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Id projektu</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Id sesji</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "containerId",
            "description": "<p>Identyfikator kontenera. Potrzebny tylko jeżeli wgrywamy transkrypcje TXT. Jeżeli jest to plik audio, zostanie stworzony nowy kontener i ten parametr nie jest konieczny.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "myFile",
            "description": "<p>Plik audio lub txt</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Informacja o powodzeniu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "containerId",
            "description": "<p>ID kontenera który został został stworzony bądź do którego wgrano transkrypcje</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>ID sesji do której należy kontener</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "oryginalName",
            "description": "<p>nazwa wgranego pliku</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": 'Wgranie pliku zakończone powodzeniem!',\n  \"sessionId\": \"5f58a92dfa006c8aed96f846\",\n  \"oryginalName\": \"sampleAudio.mp3\"\n  \"containerId\": \"5f58a92dfa006c8aed96f847\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Brak pliku</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Nie znaleziono sesji podanym id</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/repoPanel.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "put",
    "url": "/projectsList/updateProjectName/:projectId",
    "title": "Zmiana nazwy projektu",
    "description": "<p>Zmiana nazwy istniejącego projektu</p>",
    "name": "UpdateNameProject",
    "group": "Pliki",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Id projektu do usunięcia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newProjectName",
            "description": "<p>Nowa nazwa</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Ciąg znaków 'Bearer token' gdzie w miejsce 'token' należy wstawić token uzyskany podczas logowania.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość że projekt został usunięty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Id usuniętego projektu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "newName",
            "description": "<p>nowa nazwa projektu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Nazwa projektu zaktualizowana!',\n  \"projectId\": '5fe99be5d831b7c009e36fbb',\n  \"newName\": 'nowa nazwa projektu'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Błędne Id projektu</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Brak uprawnień</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Nie znaleziono projektu</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "UnprocessableEntity",
            "description": "<p>Błędna nazwa projektu</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/projectsList.js",
    "groupTitle": "Pliki"
  },
  {
    "type": "post",
    "url": "/auth/forgotPass/",
    "title": "Odzyskanie hasła",
    "description": "<p>Pozwala użytkownikowi wygenerować nowe hasło. Wywołanie tego zapytania powoduje wysłanie wiadomości email na adres użytkownika z linkiem do strony gdzie można wprowadzić nowe hasło.</p>",
    "name": "ForgotPassword",
    "group": "Użytkownik",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Wiadomość potwierdzająca wysłanie maila</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Wiadomość z dalszymi instrukcjami została wysłana na podany adres email\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unathorized",
            "description": "<p>Nie znaleziono danego adres email</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Serwer error</p>"
          }
        ],
        "502": [
          {
            "group": "502",
            "optional": false,
            "field": "BadGateway",
            "description": "<p>Problem z wysłaniem maila</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "Użytkownik"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Logowanie",
    "description": "<p>Pozwala na zalogowanie się zarejestrowanym użytkownikom i uzyskanie tokenu JWT do przeprowadzania dzalszych zapytań API. Token należy podawać w nagłówku zapytań w polu 'Authorization'.</p>",
    "name": "LoginUser",
    "group": "Użytkownik",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email użytkownika</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Hasło użytkownika</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Potwierdzenie logowania</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token który należy podać w nagłówku zapytania do API w polu &quot;Authorization&quot; jako 'Bearer token' gdzie zamiast słowa token podajemy rzeczywisty token uzyskany po zalogowaniu.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Nazwa użytkownika</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email użytkownika</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\" : 'Jesteś zalogowany',\n  \"token\": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rbGVjQHBqd3N0ay5lZHUucGwiLCJ1c2VySWQiOiI1ZjU4YTkyZGZhMDA2YzhhZWQ5NmY4NDYiLCJpYXQiOjE2MDYzMDc1NzEsImV9cXI6MPYwNjY1MzEeMX0.-ABd2a0F3lcuI0yDV7eymq4ey5_J__xGdyYAk56icO4,\n  \"userName\": Kowalski,\n  \"email\": \"kowalski@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unathorized",
            "description": "<p>Błędne hasło lub konto nie zostało potwierdzone na maila</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Użytkownik o podanym email nie został znaleziony</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>błąd serwera</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "Użytkownik"
  },
  {
    "type": "put",
    "url": "/auth/registration",
    "title": "Rejestracja użytkownika",
    "description": "<p>Rejestracja nowego użytkownika. Tylko zarejestrowani użytkownicy mogą wykonywać zapytania do API. W ten sposób chronimy dostęp do danych. Podczas rejestracji system wysyła wiadomość na podany przez użytkownika email z linkiem aktywującym konto. Bez aktywowania konta nie ma możliwości zalogowania.</p>",
    "name": "RegisterUser",
    "group": "Użytkownik",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Imię</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Hasło</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość potwierdzająca że link został wysłany na podany email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": 'Wiadomość z linkiem aktywacyjnym została wysłana na podany adres email',\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "UnprocesssableEntity",
            "description": "<p>Błędy walidacji</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Serwer error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "Użytkownik"
  },
  {
    "type": "get",
    "url": "/confirmUser/:confirmationCode",
    "title": "Weryfikacja użytkownika",
    "description": "<p>Użytkownik po zarejestrowaniu powinien otrzymać wiadomość email z linkiem aktywującym. Kliknięcie w ten link weryfikuje użytkownika że to właśnie on się zarejestrował.</p>",
    "name": "RegisterUser",
    "group": "Użytkownik",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmationCode",
            "description": "<p>Kod weryfikacyjny zawarty w linku wysłanym na email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>wiadomość potwierdzająca że konto zostało założone</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "defaultProjectId",
            "description": "<p>Identyfikator pierwszego stworzonego projektu.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "defaultSessionId",
            "description": "<p>Identyfikator pierwszej pustej sesji, gotowej do wgrania do niej własnych plików</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "demoSessionId",
            "description": "<p>Identyfikator sesji demo z wgranymi przykładowymi plikami</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"message\": 'Użytkownik został stworzony',\n  \"defaultProjectId\": \"5f58a92dfa006c8aed96f846\",\n  \"defaultSessionId\": \"5fd33950667fa7255da2dfa9\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "UnprocesssableEntity",
            "description": "<p>Błędy walidacji</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Serwer error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "Użytkownik"
  }
] });
