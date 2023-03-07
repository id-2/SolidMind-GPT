import { createSignal } from "solid-js";
import InputText from "~/components/InputText";
import Mindmap from "~/components/Mindmap";
import Nav from "~/components/Navbar";
import "./index.css";

export default function Home() {
  return (
    <main>
      <Nav />
      <div class="container mx-auto p-5 bg-base-200 rounded-xl">
        <div class="justify-center text-left md:text-center">
          <p class="text-3xl md:text-6xl max-w-none my-1 md:my-5">What is on your mind?</p>
          <p class="text-md md:text-2xl max-w-none my-1 md:my-5">Let GPT-3 help you put that to paper, or to screen :)</p>
          <InputText />
          <Mindmap />
        </div>
      </div>
    </main>
  );
}