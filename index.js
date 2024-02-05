const TextServiceClient =
  require("@google-ai/generativelanguage").TextServiceClient;
const GoogleAuth = require("google-auth-library").GoogleAuth;

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyDHy7OwLjyeqv7G3-KZ2QDMZ95FqOXeoJ0";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function planner(country, state, city, days) {
  // const prompt = `Given country ${country} , state ${state} and city ${city}, just plan a trip for me for ${days} days and the trip should consist of proper famous local places as well as food.`;
  // const prompt = `Given the country: ${country}, state: ${state}, and city: ${city}, please generate a ${days}-day travel itinerary. This itinerary should include visits to popular local attractions and recommendations for local cuisine. Each day should be well-planned and balanced with sightseeing and food experiences. Please ensure the plan is feasible and considers travel times between locations.`;
  // const prompt = `Given the country: ${country}, state: ${state}, and city: ${city}, please generate a ${days}-day travel itinerary. This itinerary should include a mix of popular local attractions, both historical and modern, along with recommendations for local cuisine, including traditional dishes. Each day should be well-planned and balanced with sightseeing and food experiences. Please ensure the plan is feasible and considers travel times between locations. The output should be an array, where each index represents the plan for that day.`;
  const prompt = `Given the country: ${country}, state: ${state}, and city: ${city}, please generate a ${days}-day travel itinerary. This itinerary should be formatted as 'Day1-Morning-Afternoon-Evening, Day2-Morning-Afternoon-Evening,...' and so on. Each day should include a mix of popular local attractions, both historical and modern, along with recommendations for local cuisine, including traditional dishes. The activities should be well-planned and balanced with sightseeing and food experiences for morning, afternoon, and evening. Please ensure the plan is feasible and considers travel times between locations. No additional special characters should be used so that it will be easier to segregate them based on days and timings.`;

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
