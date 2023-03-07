import { Component } from 'solid-js';

const nav: Component = () => {
	return (
		<div class="navbar bg-base-100">
			<div class="flex-1 justify-center md:justify-start">
				<a class="btn btn-ghost normal-case text-xl">Solid Mind GPT</a>
			</div>
		</div>
	)
}

export default nav;