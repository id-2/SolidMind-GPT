// @refresh reload
import {
  Html,
  Head,
  Body,
  Meta,
  Routes,
  FileRoutes,
  Scripts,
  ErrorBoundary,
} from 'solid-start';
import { createSignal, Suspense } from 'solid-js';

const [markdown, setMarkdown] = createSignal(
  `# Mindmap example
  ## Styles
  - *Italic*
  - **Bold**
  - ~~Del~~
  - ==Highlight==
  ## Code
  - \`console.log('inline code');\`
  ## Links
  - [Google](https://google.com)
  `
  );

if (typeof window !== 'undefined') {
  const mindmapFromLocalStorage = JSON.parse(localStorage.getItem('savedMindmap'))
  if (mindmapFromLocalStorage) {
    setMarkdown(mindmapFromLocalStorage)
  }
}


export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}

export { markdown, setMarkdown}