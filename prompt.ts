import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});
const openai = new OpenAIApi(configuration);

//ChatCompl
// ChatCompletionRequestMessage

//ChatCompletionRequestMessage;

export async function prompt(messages: ChatCompletionRequestMessage[]) {
  const searchTermsResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.8,
    messages,
  });

  return searchTermsResponse.data.choices[0]?.message?.content;
}
