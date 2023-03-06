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
  `# Template
  - Item 1
    - Item
  - Item 2
    - Item
  - Item 3
    - Item  
  - Item 4
  `
  );

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