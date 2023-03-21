import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const basicPrompt: { role: "user" | "assistant", content: string }[] = [{
  "role": "user",
  "content": `Adesso ti spiegherò come funziona il gioco di ruolo da tavolo "Sigmata: This Signal Kills Fascists"
Il gioco è ambientato in una storia alternativa distopica del 1986 in cui il Regime, un governo fascista ispirato al maccartismo, controlla la società con il pugno di ferro, usando una milizia chiamata Freedom Fists e il controllo sui media. I giocatori assumono il ruolo di un Ricevitore che fa parte della Resistenza. Un Ricevitore è un cyborg con superpoteri che vengono attivati ​​dal Segnale. La Resistenza è divisa in quattro fazioni: i Creatori, il Partito, la Fede e i Veterani. I Creatori sono un gruppo di amministratori delegati e imprenditori che ritengono che il libero mercato sia soffocato dal regime. Il Partito è un gruppo socialista che si batte per i diritti dei lavoratori. La Fede è un gruppo di sacerdoti e fedeli cattolici che credono che il regime agisca contro Dio. I Veterani sono ex miliziani che sentono che il regime sta diventando corrotto quanto la dittatura che hanno combattuto all'estero. 
Le fazioni sono ispirate dalla situazione internazionale durante il regime di Assad. I Veterani sono analoghi alla Free Syrian Army, la Fede è analoga i gruppi islamisti coinvolti nel conflitto siriano, i Creatori sono analoghi la comunità internazionale e l'ordine neoliberista, e il Partito è analogo la risposta della sinistra occidentale al conflitto.`
}, {
  "role": 'assistant',
  content: `Grazie per avermi spiegato il gioco di ruolo "Sigmata: This Signal Kills Fascists". Sembrerebbe un gioco interessante e coinvolgente, con una trama distopica e una vasta gamma di personaggi con differenti ideologie e obiettivi.

Il fatto che i giocatori assumano il ruolo di un Ricevitore, un cyborg con superpoteri attivati ​​dal Segnale, aggiunge un'ulteriore dimensione di gioco e intrighi. Inoltre, la presenza delle quattro fazioni con diverse ideologie potrebbe creare tensioni all'interno del gruppo di gioco e portare a scelte difficili e interessanti.

È interessante notare anche l'ispirazione della situazione internazionale durante il regime di Assad e come le fazioni nel gioco siano analoghe ai gruppi coinvolti nel conflitto siriano. Ciò potrebbe aggiungere un elemento di realismo e di rilevanza attuale al gioco.

In generale, sembra che "Sigmata: This Signal Kills Fascists" abbia molte potenzialità e possa fornire un'esperienza di gioco coinvolgente e significativa.`
}, {
  role: "user",
  content: `Adesso ti spiegherò il concetto di Missione nel contesto del gioco di ruolo "Sigmata: This Signal Kills Fascists"

  Una Missione è un elenco di scene strutturate. Le scene strutturate sono di Combattimento (uno scontro violento con i nemici che termina quando tutti i nemici sono stati eliminati), Evasione (una sequenza di infiltrazione, fuga o inseguimento che termina quando viene raggiunto un elenco di waypoint) o Intrigo (una situazione sociale, un indagine o l'applicazione di una strategia che termina quando vengono raggiunti alcuni punti chiamati Agende. Le Agende possono essere tra di loro: Sequenziali, ovvero una deve essere raggiunta prima di poter iniziare l'altra; In Competizione, ovvero raggiungerne una impedisce di raggiungere l'altra; Indipendenti, ovvero possono essere raggiunte indipendentemente l'una dall'altra )`
}, {
  role: "assistant",
  content: `Grazie per avermi spiegato il concetto di Missione nel contesto del gioco di ruolo "Sigmata: This Signal Kills Fascists". Sembra che le Missioni siano un modo strutturato per creare una serie di scene di gioco, ognuna con un obiettivo specifico da raggiungere.

  Le scene di Combattimento, Evasione e Intrigo forniscono una varietà di sfide e obiettivi per i giocatori, offrendo un mix di azione, stealth e interazione sociale.
  
  In particolare, le Agende nelle scene di Intrigo sembrano aggiungere un elemento di scelta e di strategia alla trama, poiché i giocatori devono decidere l'ordine in cui affrontare gli obiettivi e considerare le implicazioni delle loro scelte.
  
  In generale, sembra che l'uso di Missioni strutturate nel gioco di ruolo "Sigmata: This Signal Kills Fascists" offra un'esperienza di gioco dinamica e coinvolgente, consentendo ai giocatori di vivere un'avventura in un mondo distopico e pericoloso.`
}, {
  role: "user",
  content: `Adesso ti farò degli esempi dei temi che potrebbero venire affrontati nelle scene strutturate.

  In una scena di Combattimento: un attacco da parte dei Freedom Fist, un assalto a un veicolo blindato, un assalto a una base del regime
  
  In una scena di Evasione: infiltrarsi all'interno di una struttura, inseguimento di automobili, scoprire un laboratorio di sperimentazione umana
  
  In una scena di Intrigo: scoprire informazioni da un bersaglio, gestire una lite tra diverse parti, investigare una scena del crimine `
}, {
  role: "assistant",
  content: `Adesso ti farò degli esempi dei temi che potrebbero venire affrontati nelle scene strutturate.

  In una scena di Combattimento: un attacco da parte dei Freedom Fist, un assalto a un veicolo blindato, un assalto a una base del regime
  
  In una scena di Evasione: infiltrarsi all'interno di una struttura, inseguimento di automobili, scoprire un laboratorio di sperimentazione umana
  
  In una scena di Intrigo: scoprire informazioni da un bersaglio, gestire una lite tra diverse parti, investigare una scena del crimine `
}]

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const scenes = req.body.scenes || '';
  const text = req.body.text || '';
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const baseChat = [...basicPrompt, {
      role: "user" as const,
      content: generatePrompt(scenes, text)
    }]
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": baseChat
    });

    const basicContent = completion.data.choices[0].message?.content
    if (!basicContent) {
      return res.status(400).json({});
    }

    const detailsList: string[] = []

    for (let index = 0; index < parseInt(scenes); index++) {
      const details = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        "messages": [...baseChat, { role: "assistant" as const, content: basicContent }, {
          role: "user",
          content: `adesso espandi la scena ${index + 1} in un un testo di 300 parole`
        }]
      });

      detailsList.push(details.data.choices[0].message?.content || `No additional details for scene ${index + 1}`)

    }

    return res.status(200).json({ base: basicContent, details: detailsList });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(numberOfScenes: number, text: string) {
  return `
  Adesso scrivi una Missione per il gioco di ruolo "Sigmata: This Signal Kills Fascists" composta da ${numberOfScenes} scene. La situazione è che ${text}.

Ricorda che una missione è una lista di scene strutturate e che le scene sono solo di tipo Combattimento, Evasione e Intrigo e che una scena strutturata ha questa forma


Questo è un esempio di una scena strutturata di Combattimento. Il totale del Livello Pericolo moltiplicato per il numero di nemici dovrebbe essere di circa di 3 per ogni personaggio giocante. Specificherò tra parentesi quadre le parti variabili della scena.

Scena [NUMERO SCENA]: Combattimento
Nemici:
- [NUMERO DI NEMICI]x [NOME DEL NEMICO]: Danger [LIVELLO PERICOLO TRA 1 e 3]
- [NUMERO DI NEMICI]x [NOME DEL NEMICO]: Danger [LIVELLO PERICOLO TRA 1 e 3]

[DESCRIZIONE DI DOVE AVVIENE IL COMBATTIMENTO]
[DESCRIZIONE DELL'APPROCCIO DEI NEMICI]
[CONSIGLI PER IL DUNGEON MASTER SU COSA POTREBBE AGGIUNGERE ALL'INCONTRO]

Questo è un esempio di una scena strutturata di Evasione. L'Allarme iniziale è legato alla pericolosità della scena e dovrebbe essere 1 per una situazione pressocché calma, 2 per una situazione di allerta, 3 per una situazione di pericolo imminente. Possono esserci qualsiasi numero di waypoint, ma è preferibile mantenere il totale degli Step dei waypoint intorno a 8. Il valore degli step di un waypoint va da un minimo di 1 a un massimo di 5. Specificherò tra parentesi quadre le parti variabili della scena. 

Allarme Iniziale: [VALORE DI ALLARME INIZIALE]
Scena [NUMERO SCENA]: Evasione
Start: [LUOGO/SITUAZIONE IN CUI INIZIA LA SCENA]
Waypoint 1:  [LUOGO/SITUAZIONE DA RAGGIUNGERE] - Steps [VALORE DEGLI STEP DEL WAYPOINT]
Waypoint 2:  [LUOGO/SITUAZIONE DA RAGGIUNGERE] - Steps [VALORE DEGLI STEP DEL WAYPOINT]

[DESCRIZIONE DI DOVE AVVIENE LA SCENA]
[DESCRIZIONE DELLE DIFFICOLTA DA SUPERARE]
[CONSIGLI PER IL DUNGEON MASTER SU COSA POTREBBE AGGIUNGERE ALL'INCONTRO]


Questo è un esempio di una scena strutturata di Intrigo. La Pressione iniziale è legata alla segretezza, sospetto e/o stress necessari per la scena e dovrebbe essere 1 per una situazione abbastanza aperta, 2 per una situazione in cui c'è un rischio tangibile di essere esposti, 3 per una situazione di aperto rischio. Possono esserci un numero qualsiasi di Agende, ma è preferibile mantenere il valore totale degli Step delle agende intorno a 8. Il valore degli step di un agenda va da un minimo di 1 a un massimo di 5. Specificherò tra parentesi quadre le parti variabili della scena. 

Pressione Iniziale: [VALORE DI PRESSIONE INIZIALE]
Scena [NUMERO SCENA]: Intrigo
Agenda [X]: [DESCRIZIONE AGENDA] : Step [VALORE DEGLI STEP DELL'AGENDA]
Agenda [Y]: [DESCRIZIONE AGENDA] [OPZIONALMENTE: SE SEQUENZIALE O IN COMPETIZIONE RISPETTO ALL'AGENDA X] : Step [VALORE DEGLI STEP DELL'AGENDA]

[DESCRIZIONE DI DOVE AVVIENE LA SCENA]
[DESCRIZIONE DEI RISCHI INTRINSECHI DELLA SCENA]
[DESCRIZIONE DI COSA POTREBBE ANDARE MALE SE UN AGENDA NON VIENE COMPLETATA]
[OPZIONALMENTE: SE CI SONO AGENDE IN COMPETIZIONE, DESCRIZIONE DELLE OPZIONI]
[CONSIGLI PER IL DUNGEON MASTER SU COSA POTREBBE AGGIUNGERE ALL'INCONTRO]

  `
}

