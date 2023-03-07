import { Component, createEffect, onMount } from 'solid-js';
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

  if (typeof window !== 'undefined') {
    const chatsFromLocalStorage = JSON.parse(localStorage.getItem('savedChats'))
    if (chatsFromLocalStorage) {
      setChats(chatsFromLocalStorage)
    }
  }

  const addChat = (role:string, text:string) => {
    setChats([...chats, { role: role, content: text }]);
  }

  let editedMindmap = false;
  const requestHandler = async () => {
    const submitButton = document.getElementById("submitRequest")
    submitButton.classList.add("loading")
    submitButton.classList.add("btn-disabled")
    const gptInput = document.querySelector('#gptInput') as HTMLInputElement
    if (editedMindmap) {
      addChat('assistant', `This is the new mindmap to start from:\n${getEditArea()}`)
    }

    addChat('assistant', gptInput.value)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      temperature: 0,
      messages: chats
    });

    addChat('assistant', completion.data.choices[0].message.content);
    setMarkdown(completion.data.choices[0].message.content);

    editedMindmap = false;
    updateEditArea();

    submitButton.classList.remove("loading")
    submitButton.classList.remove("btn-disabled")
    gptInput.value = "";
  }

  const editHandler = async () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    setMarkdown(editArea.value)
    editedMindmap = true;
  }

  const resizeEditArea = () => {
    const textarea = document.querySelector("#editArea");
    textarea.addEventListener('input', autoResize, false);
          
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
  }

  const updateEditArea = () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    editArea.value = markdown();
  }

  const toggleEditArea = () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    const toggle = document.querySelector('#editToggle') as HTMLInputElement
    updateEditArea();
    if (toggle.checked == true){
      editArea.style.display = "block";
    } else {
      editArea.style.display = "none";
    }
  }

  const getEditArea = () => {
    const editArea = document.querySelector('#editArea') as HTMLInputElement
    return editArea.value;
  }

  const resetMindmap = () => {
    setMarkdown("");
    setChats([{ role: 'system', content: system_prompt}]);
    updateEditArea();
    localStorage.clear()
  }

  const saveMindmap = () => {
    localStorage.setItem('savedMindmap', JSON.stringify(markdown()))
    localStorage.setItem('savedChats', JSON.stringify(chats))
  }

  onMount(() => {
    updateEditArea()
    resizeEditArea()
  }); 

  return (
    <div class="form-control">
      <div class="flex my-5">
        <div class="input-group w-3/5">
          <input id="gptInput" type="text" placeholder="What is on your mind…" class="input input-bordered grow"/>
          <button id="submitRequest" class="btn" onClick={() => requestHandler()}>Generate</button>
        </div>
        <label class="label cursor-pointer w-1/5 mx-5 justify-center">
          <span class="label-text mr-5">Edit mindmap</span> 
          <input type="checkbox" id="editToggle" class="toggle toggle-primary toggle-lg" onClick={() => toggleEditArea()}/>
        </label>
        <div class="input-group w-1/5">
          <button class="btn btn-primary grow" onClick={() => saveMindmap()}>Save</button>
          <button class="btn btn-primary grow" onClick={() => resetMindmap()}>Reset</button>
        </div>
      </div>
      
      <div class="flex-1">
        <textarea
          id="editArea"
          class="textarea textarea-bordered hidden overflow-hidden resize-y w-full h-72"
          value=""
          oninput={() => editHandler()}
        />
      </div>
    </div>
  )
}

export default inputText;