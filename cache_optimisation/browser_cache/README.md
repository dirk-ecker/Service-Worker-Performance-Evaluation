# Beschreibung
Browser Cache Test. Bilder werden über img-Tag geladen.
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 

# TODO
- Version Controll überprüfen
- Bildanzahl | Bildgröße als Testfaktor

# Ergebnisse

- HTTP Cache (memory & disk Cache) ist eigentlich viel schneller als SW Cache.  
- Ressourcen werden von memory cache geladen (oberste Schicht), muss aber vom disk cache (HTTP) geladen werden.