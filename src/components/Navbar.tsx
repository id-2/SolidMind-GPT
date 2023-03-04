import { Component } from 'solid-js';

const nav: Component = () => {
	return (
		<div class="navbar bg-base-100">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl">Solid Mind GPT</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
				</ul>
			</div>
		</div>
	)
}

export default nav;