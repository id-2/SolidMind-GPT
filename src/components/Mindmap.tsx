import { Component, createEffect, onMount } from 'solid-js';

import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';
import { markdown, setMarkdown } from '~/root';

function Mindmap() {
    const transformer = new Transformer();
    const { root } = transformer.transform(markdown());
    let mm: Markmap;

    onMount(() => {
        mm  = Markmap.create('#markmap', null, root);
    });

    createEffect(() =>{
        const { root } = transformer.transform(markdown());
        mm.setData(root);
        mm.fit();
    });

    return (
        <svg id="markmap" style="width: 100%; height: 100%"></svg>
    );
}

export default Mindmap;