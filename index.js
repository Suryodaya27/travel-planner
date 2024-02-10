const TextServiceClient =
  require("@google-ai/generativelanguage").TextServiceClient;
const GoogleAuth = require("google-auth-library").GoogleAuth;

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDHy7OwLjyeqv7G3-KZ2QDMZ95FqOXeoJ0";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function planner(country, state, city, days) {

  const prompt =`Given the country: ${country}, state: ${state}, and city: ${city}, please generate a ${days}-day travel plan. Include a mix of modern attractions along with recommendations for local cuisine, including traditional dishes and famous amusement or aqua parks or famous malls. Ensure the plan is feasible, considering travel times between locations. just write in such a way it should be easy to seperate based on days and timing like morning, afternoon , evening and night using split functions and no extra special characters.It should be in a readable format.It should be fun and unique.`;

  try {
    const result = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });
    const output = JSON.stringify(result[0]?.candidates?.[0]?.output, null, 2);
    return output;
  } catch (error) {
    console.error(error);
    return null;
  }
}

planner("India", "Maharashtra", "Mumbai", 3).then((output) => {
  console.log(output);
});
