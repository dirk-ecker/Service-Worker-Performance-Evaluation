# Beschreibung
Eine klassische MPA liefert jede Seite komplett d.h. man bekommt immer
eine vollständige HTML-Seite im Gegensatz zur SPA, die eigentlich nur
initial HTML und JavaScript erhält und danach die Seite anhand von JSON
Daten erstellt.

### Ein Beispiel für Composite Response mittels SW
- index.html wird initialisiert, Header und Footer werden vom Netzwerk geholt und precacht zum ersten Mal
- Wenn nach dem Content1 gefragt wird (Man kann hier auch ein Order erstellen für Subpages), wird ein neues Response konstruiert aus Header, Content und Footer Elementen. 

# TODO
- Added offline response from Cache
- Überprüfung von /partials/- Pfad ist im Kontext des vorgegegebenen Routing Systems nutzlos ?

Test NavigationStart, TTFB, Server Response, Navigation End.  

# Ergebnisse
