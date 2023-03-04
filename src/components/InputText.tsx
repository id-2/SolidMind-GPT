import { Component } from 'solid-js';
import { markdown, setMarkdown } from '~/root';

const inputText: Component = () => {

  const handler = () => {
    const textarea = document.querySelector('#inputField') as HTMLInputElement
    setMarkdown(textarea.value)
    console.log(markdown())
  }

  return (
    // <div class="form-control">
    //   <div class="input-group justify-center">
    //     <input type="text" placeholder="What is on your mind…" class="input input-bordered w-1/3" />
    //     <button class="btn btn-square">
    //       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    //     </button>
    //   </div>
    // </div>
    <div class="flex-1">
      <textarea
        id="inputField"
        class="w-full h-full border border-gray-400"
        value=""
        oninput={() => handler()}
      />
    </div>
  )
}

export default inputText;