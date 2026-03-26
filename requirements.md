# Requirements

In diesem Repo sind die TypeScript Klassen Definitionen von allen Konfigurationen welche im Dashboard Service zu Verfügung stehen.

Diese soll der Nutzer als npm sich ziehen können, typesave deklarieren und mit einer cli (anderes Repo) synthesizen und deployen. Dadurch entstehen einfache stabile und dx firsts Dashboards.

Für den Anfang sollen diese Entitäten exestieren:

1. Stack
2. Dashboard
3. Chart
4. DataSource
5. Query
6. Secret

Ein Stack definiert einfach erstmal dem Rahmen in dem alles lebt. Jede Entität bewegt sich erstmal nur in diesem Raum und kann zwischen den Entitäten verwendet werden.

Ein Dashboard ist das die erste sichtbare Komponente. Das Dashboard besitzt Charts welche auf dem Dashboard platziert werden können. Erstmal einfach mit x, y, w, h.
