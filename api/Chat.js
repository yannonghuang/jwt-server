const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chat = async (req, res) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003", //"text-ada-001", //
    prompt: generatePrompt(req.body.prompt),
    temperature: 0.6,
    max_tokens: 2048,
  }).catch(e => {console.log(e)});

  //console.log(completion.data)

  result = completion
  ? completion.data.choices[0].text.trim()
  : 'openai returns no response, seemly experiencing touble ...';
  res.status(200).json({ result });  
  //res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
  return prompt;
}

module.exports = chat;