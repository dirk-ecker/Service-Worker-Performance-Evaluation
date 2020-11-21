# Beschreibung
Der SW ist in der Lage die HTTP Requests abfangen und umzuleiten. Dabei könnte theoretisch der Ressource Request, abhängig von der Serverauslastung, bzw. Serververfügbarkeit an eine andere App Server Instanz geschickt werden.

- https://serviceworke.rs/load-balancer.html
- https://sinaru.com/2020/07/15/use-service-workers-to-replace-load-balancer/


# TODO
### Idee 1:
 Ressourcen abhängig von der Serververfügbarkeit liefern. Die erste Anfrage erreicht den "Server Manager", der die App initialisiert und den SW installiert. Der Server Manager kriegt auch die Info über andere App Server Instanzen. Bei der Ressource Anfrage werden die Server auf Ihre Verfügbarkeit überprüft und werden im Falle des Misserfolgs weiter geleitet. 

### Idee 2:
 Ressourcen nach dem Round Robin Prinzip liefern, d.h z.B wenn eine App 3 Clusters hätte, wäre das Bild 1 von Server 1 geliefert, Bild 2 von Server 2, Bild 3 von Server 3. Dabei würde man die Gleichverteilung der Requests erreichen (?).      

### Idee 3:
 Load Balancing mit Lazy Loading kombinieren. "Lazy Loading involves serving below-the-fold resources at the moment of need". D.h Bei dem ersten Request wird die App initialisiert, SW geladen bzw. auch die Information über andere App Server Instanzen. Der SW würde überprüfen ob es sich um ein img-Request handelt (RegEx z.B ob aus der /image/ Subdirectory stammt) und dann entsprechend den Request nach dem RR Prinzip umleiten. Vielleicht könnte man noch die Verfügbarkeit noch parallel überprüfen.

# Ergebnisse
