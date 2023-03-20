import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": generatePrompt(scenes, text) }]
    });
    res.status(200).json({ result: completion.data.choices[0].message?.content });
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
Can you help me with writing a mission for the TTRPG Sigmata: This Signal Kills Fascists? The game is set in a dystopian alternate history 1986 where the Regime, a fascist government inspired by mccarthyism, controls society with an iron fist, using a militia called Freedom Fists and aligned media. The players take on the role of a Receiver for the Resistance, a cyborg with superpowers activated by the Signal, fighting against the regime. The Resistance is divided into four factions: the Makers, the Party, the Faith, and the Old Men. The Makers are a group of CEOs and entrepreneurs who feel that the free market is being stifled by the regime. The Party is a socialist group that fights for workers' rights. The Faith is a group of Catholic priests and faithful who believe the regime is acting against God. The Old Men are ex-militia who feel that the regime is becoming as corrupt as the dictatorship they fought overseas. The factions draw inspiration from the international situation during the Assad regime, with the Old Men representing the Free Syrian Army, the Faith standing in for Islamist groups involved in the Syrian conflict, the Makers embodying the international community and the neoliberal order, and the Party representing the Western Left's response to the conflict.

There are currently two Receivers in the party: Jonhatan, a loyalist priest in his 40s that defected to the resistance after massive deportation of his flock, and Rachel, a 20-something afroamerican girl with anarchist views that want to make the Regime pay for the death of her brother.

A mission is a list of structurured scene. The structured scenes are either of Combat (a violent confrontation with enemies that ends when all the enemies are taken care of), Evasion (an infiltration, escape, or chase sequence that ends when a list of waypoint are reached) or Intrigue (a social setting, investigation, or strategy that ends when a list of agendas, that could be indipendent, sequential or competing with each other, are reached)

I need the list of enemies for the combat scenes, a list of waypoints for the evasion scenes, and a list of agendas (with details if two agendas are sequentials, competing or indipendent from each other) 

this are example of agendas explained in full length:
Changing minds 
Convincing hesitant, skeptical, or antagonistic persons to reconsider their positions. Examples include recruiting a collaborator to spy for the Resistance, convincing Freedom Fist holdouts to surrender instead of fighting to the last man, coercing a jailor into facilitating a prison break, talking down protestors to keep their cool despite neo-Nazi incitement, or galvanizing a news room editor to run a story about a Regime atrocity. 
Gathering Intelligence 
Acquiring useful information from persons who would rather keep that information out of Resistance hands. Examples include blackmail material on Regime officials, plans for upcoming raids on Resistance safehouses, aliases of Regime spies who have infiltrated the Resistance, locations of Freedom Fist black sites, travel routes of prisoner transports, or the secret loyalties of seemingly neutral parties. 
Escalating Privilege 
Gaining access to locations, events, or individuals of high strategic value. Examples include securing an invitation to the gala’s exclusive after party, gaining an audience with a high ranking official, securing access to classified data systems, being inducted into a secret society, acquiring the uniforms or credentials needed to impersonate a VIP’s guards or servants, or bluffing past the guards into a restricted area

Now write a mission with ${numberOfScenes} scenes where the situation is that ${text}
  `
}

