import { Component, createResource } from 'solid-js';
import { markdown, setMarkdown } from '~/root';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { createStore, produce } from 'solid-js/store';

let input_prompt = "Create a mindmap called brainstorm with the items business, technology, social and marketing";
const system_prompt = `
Given a prompt, update the mindmap items and not make anything up. You can only reply with raw markdown. Don't write anything that is not found in the prompt.

Example mindmap:
# [Mindmap name]
## [Item]
- [Subitem]
## [Item]
- [Subitem]
## [Item]
- [Subitem]
## [Item]
- [Subitem]`

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const [chats,setChats] = createStore([]);
const addChat = (text:string) => {
  setChats(
    produce((chats) => {
      setChats([...chats(), { role: "user", content: text }]);
    }),
  );
};

// const [messagesToSend,setmessagesToSend] = createStore(
//   [
//     { role: "system", content: system_prompt},
//     { role: "user", content: `Prompt: ${input_prompt}`},
//   ]
// )

// console.log({ role: "system", content: getPrompt('src/system_prompt.txt')},
// { role: "user", content: `Prompt: ${input_prompt}`})

const inputText: Component = () => {

  // const requestHandler = async () => {
  //   const textarea = document.querySelector('#inputField') as HTMLInputElement
  //   const completion = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo-0301",
  //     temperature: 0,
  //     messages: [
  //           { role: "system", content: system_prompt},
  //           { role: "user", content: `Prompt: ${input_prompt}`},
  //         ]
  //   });
    
  //   console.log(completion.data.choices[0].message);
  //   setMarkdown(textarea.value)
  //   console.log(markdown())
  // }

  return (
    <div class="form-control">
      <div class="input-group justify-center">
        <input id="inputField" type="text" placeholder="What is on your mind…" class="input input-bordered w-1/3"/>
        <button class="btn btn-square" onClick={() => requestHandler()}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>
    // <div class="flex-1">
    //   <textarea
    //     id="inputField"
    //     class="w-full h-full border border-gray-400"
    //     value=""
    //     oninput={() => handler()}
    //   />
    // </div>
  )
}

export default inputText;