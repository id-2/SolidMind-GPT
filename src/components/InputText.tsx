import { Component, createResource, onMount } from 'solid-js';
import { markdown, setMarkdown } from '~/root';
import { Configuration, OpenAIApi } from 'openai';
import { createStore, produce } from 'solid-js/store';

// const input_prompt = "Create a mindmap called brainstorm with the items business, technology, social and marketing";
const system_prompt = 
`Given a prompt, update the mindmap items and not make anything up. You can only reply with raw markdown. Don't write anything that is not found in the prompt.

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

const inputText: Component = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [chats,setChats] = createStore([
    { role: 'system', content: system_prompt},
  ]);

  const addChat = (role:string, text:string) => {
    setChats([...chats, { role: role, content: text }]);
  }

  let editedMindmap = false;
  const requestHandler = async () => {
    const gptInput = document.querySelector('#gptInput') as HTMLInputElement
    if (editedMindmap) {
      addChat('assistant', `This is the new mindmap to start from:\n${getEditArea()}`)
    }

    addChat('assistant', gptInput.value)
    console.log(chats);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      temperature: 0,
      messages: chats
    });

    addChat('assistant', completion.data.choices[0].message.content);
    setMarkdown(completion.data.choices[0].message.content);
    console.log("Update editArea...");

    editedMindmap = false;
    updateEditArea();

    gptInput.value = "";
  }

  const editHandler = async () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    setMarkdown(editArea.value)
    editedMindmap = true;
    console.log(editedMindmap);
  }

  const updateEditArea = async () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    editArea.value = markdown();
    console.log(`This is the current markdown:\n${markdown()}`);
  }

  const getEditArea = () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    return editArea.value;
  }

  onMount(() => {
    updateEditArea();
  }); 

  return (
    <div class="form-control">
      <div class="input-group justify-center">
        <input id="gptInput" type="text" placeholder="What is on your mind…" class="input input-bordered w-1/3"/>
        <button class="btn btn-square" onClick={() => requestHandler()}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
      <div class="flex-1">
        <textarea
          id="editArea"
          class="w-full h-full border border-gray-400"
          value=""
          oninput={() => editHandler()}
        />
      </div>
    </div>
  )
}

export default inputText;