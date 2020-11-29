# Beschreibung
SW Cache Test. Der index.js Script generiert img-Tags mit src Parameter. Parallel erzeugt der SW die Cache-Storage und liefert die Bidler direkt vom Cache. 
Die erste Anfrage dient dem Cache Warm-Up. Für weitere Requests müssen die Performance Parameter gemessen werden. 



# TODO

- Performance Metriken: Time To First Byte, First Meaningful Paint, Dom Content Loaded, Server Response Time.

- Warum ist es so langsam ? Kommunikation zwischen main thread und SW überpfüfen

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
- Min Time, Max Time, Mittelwert
 
# Ergebnisse
SW lädt Ressourcen langsamer als Browser Cache.
