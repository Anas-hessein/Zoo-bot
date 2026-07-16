const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/zoo-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/zoo-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/zoo-dogfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://dogapi.dog/api/v2/facts");

    await respond({ text: `Dog Fact:\n${response.data.data[0].attributes.body}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a dog fact." });
  }
});

app.command("/zoo-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});


app.command("/zoo-dogpic", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        await respond ({ text: "Dog pic", 
            blocks: [
                {
                    type: "image",
                    image_url: response.data.message,
                    alt_text: "Random dog pic"
                }
            ]
         });
    } catch (err) {
        await respond({ text: "Failed to generate dog pic."});
    }
    
})

app.command("/zoo-catpic", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search");
        await respond ({ text: "Cat pic", 
            blocks: [
                {
                    type: "image",
                    image_url: response.data[0].url,
                    alt_text: "Random cat pic"
                }
            ]
         });
    } catch (err) {
        await respond({ text: "Failed to generate cat pic."});
    }
    
})

app.command("/zoo-duckpic", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://random-d.uk/api/random");
        await respond ({ text: "Duck pic", 
            blocks: [
                {
                    type: "image",
                    image_url: response.data.url,
                    alt_text: "Random Duck pic"
                }
            ]
         });
    } catch (err) {
        await respond({ text: "Failed to generate duck pic."});
    }
    
})

app.command("/zoo-foxpic", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://randomfox.ca/floof/");
        await respond ({ text: "Fox pic", 
            blocks: [
                {
                    type: "image",
                    image_url: response.data.image,
                    alt_text: "Random Fox pic"
                }
            ]
         });
    } catch (err) {
        await respond({ text: "Failed to generate fox pic."});
    }
    
})
