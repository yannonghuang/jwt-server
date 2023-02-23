const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const giftIdeas = async (req, res) => {
//app.post('/api/generate-gifts',requireAuth, async (req, res) => {  
  const { priceMin, priceMax, gender, age, hobbies } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
    temperature: 0.6,
    max_tokens: 2048,
  }).catch(e => {console.log(e)});

  result = completion
  ? completion.data.choices[0].text
  : 'openai returns no response, seemly experiencing touble ...';
  res.status(200).json({ result });
  //res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
  return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.`;
}

module.exports = giftIdeas;