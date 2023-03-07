import { createSignal } from "solid-js";
import InputText from "~/components/InputText";
import Mindmap from "~/components/Mindmap";
import Nav from "~/components/Navbar";
import "./index.css";

export default function Home() {
  return (
    <main>
      <Nav />
      <div class="container mx-auto p-5 bg-base-200">
        <div class="justify-center">
          <p class="text-6xl">What is on your mind?</p>
          <p class="text-2xl">Let GPT-3 help you put that to paper, or to screen :)</p>
          <InputText />
          <Mindmap />
        </div>
      </div>
    </main>
  );
}