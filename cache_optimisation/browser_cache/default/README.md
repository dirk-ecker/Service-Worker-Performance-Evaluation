# Beschreibung
Browser Cache Test. Bilder werden über img-Tag geladen.
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 

# TODO
- Version Controll überprüfen
- Bildanzahl | Bildgröße als Testfaktor
- Text Größe = 23,6 Kb
- Image Größe = 489 Kb

__Testablauf__
- Cross Browser Test (Chrome, Firefox)
- Cache Warm-Up (First Time User) + Returning User 
- 4 Fälle - 10 Bilder/klein
          - 50 Bilder/klein
          - 10 Bilder/groß
          - 50 Bilder/groß
- LCP, FCP

- Ressource Timing als HAR-file
- Ressource Timing als Chart
- Min Time, Max Time, Mittelwert

# Ergebnisse

- Browsr Cache (memory & disk Cache) ist eigentlich viel schneller als SW Cache.  
- Bilder werden vom Memory Cache geladen und Texte vom Disk Cache geladen.