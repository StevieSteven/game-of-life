#Game of Life

Dies ist eine Beispielimplementation von Game of Life

Bei der Simulation gelten folgende Regeln:

1) Jede lebende Zelle, die weniger als 2 lebende Nachbarzellen hat, stirbt
2) Jede lebende Zelle, die 2 oder 3 lebendige Nachbarzellen hat, lebt weiter
3) Jede lebende Zelle, die mehr als 3 lebende Nachbarzellen hat, stirbt
4) Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird lebendig

Die App ist mehrsprachig (Deutsch, Englisch).

Das konfigurierte Spielfeld kann mittels URL exportiert und importiert werden. Somit lassen sich die Ausgangssituation mit anderen teilen.

Dür die bequeme Simulation kann diese automatisiert werden.

Die App ist OpenSource.


Für die Nutzung gibt es 2 Wege. 

##Nutzung über eigenen Webserver:

Falls die Nutzung über einen eigenen Webserver (z.B. Apache) gewollt ist, muss jedeglich der Inhalt von
```/client/build``` in das Verzeichnis des Webservers kopiert werden.

##Nutzung mittels NodeJS: 

Falls nicht vorhanden, installieren Sie die neueste Version NodeJS.


Gehen sie in das Verzeichnis ```server``` und starten Sie den Server mittels Kommandozeile ```npm run install-start```
  
Der Server start auf Port 8080.