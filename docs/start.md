# Challenge tecnica backend

## Overview

Sviluppare un semplice ecommerce per l’acquisto di buoni.

Ogni voce dell’ecommerce deve avere:

- Un nome
- Una serie di tagli di prezzo possibili
- Una descrizione
- Una serie di asset (foto) associate

L’ecommerce non deve avere funzionalità di carrello.

Il backend deve essere sviluppato con **NodeJS**, **TypeScript** ed **Express**, mentre il **database deve essere MySQL**.

L’applicazione deve avere funzionalità base di **login e registrazione** (va benissimo un semplice nome utente e password hashata).

Gli **acquisti di buoni** vengono salvati e recuperati comunicando con il backend tramite un’**API REST autenticata da token**, restituito da una funzione di login (non è necessario implementare un flusso di refreshToken, basta un normale access token **JWT**).

Il tutto deve essere **containerizzato tramite Docker e Docker Compose**, incluso il database.

### Documentazione

Documentare utilizzando un tool di vostra preferenza (Notion, il [README.md](http://README.md) della repo, ecc.):

- Le **API del backend**, con:
  - richiesta (header, body)
  - risposta (header, body)
  - eventuali messaggi di errore
- Le **tabelle create sul DB** e le **relazioni tra di esse**
  - Plus se con schema ER creato con tool come [draw.io](http://draw.io), Excalidraw, FigJam

**Pubblicare la repo su GitHub.**

## Tempo a disposizione

**7 giorni**
