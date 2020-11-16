# Beschreibung
Ich nehme an das Bild so auch initial durch den Service geladen werden,
da dies ja abhängig von der Bandbreite je nachdem ein anderes Image sein
soll.

# TODO
al-sw ist nicht sprechender Name, das sollten wir umbenennen.

Der Browser versucht (F5) das Image schon zu laden, bevor der SW aktiv
ist. D.h. der SW kann das dann nicht übernehmen.
Ich denken wir müssen den SW so umschreiben, das dieser initial lädt bzw.
wartet bis das Image da ist, oder? Es macht auf jeden Fall keinen Sinn 
immer das große Image zu laden.

# Ergebnisse
