# Beschreibung
Browser Cache Test. Bilder werden über img-Tag geladen.
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 

# TODO
- Version Controll überprüfen
- Bildanzahl | Bildgröße als Testfaktor
- Text Größe = 23,6 Kb
- Image Größe = 489 Kb

# Ergebnisse

- Browsr Cache (memory & disk Cache) ist eigentlich viel schneller als SW Cache.  
- Bilder werden vom Memory Cache geladen und Texte vom Disk Cache geladen.