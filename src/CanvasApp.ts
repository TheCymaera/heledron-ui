import "./CanvasApp.css";
import {} from "helion/core.js";
import {} from "helion/Intangible.js";
import {} from "helion/Stack.js";
import {} from "helion/Panel.js";
import {} from "helion/AltSurface.js";
import {} from "helion/CircleButton.js";
import {} from "helion/LightTheme.js";
import { fa5_brands_github, fa5_solid_home, fa5_solid_info, fa5_solid_share, fa5_solid_times } from "fontawesome-svgs";

const html = /* html */ `
<helion-stack class="CanvasApp helion-alt-surface">
	<helion-intangible class="CanvasApp_ActionButtons">
		<button class="helion-circle-button CanvasApp_Button CanvasApp_ToggleDialog">${fa5_solid_info}</button>
		<button class="helion-circle-button CanvasApp_Button CanvasApp_Share">${fa5_solid_share}</button>
		<div style="flex: 1;"></div>
		<a><!-- GitHub link --></a>
		<a class="helion-circle-button CanvasApp_Button" href="/">${fa5_solid_home}</a>
	</helion-intangible>
	
	<helion-panel class="CanvasApp_Dialog">
		<div style="overflow: auto; height: 100%;">
			<div class="CanvasApp_DialogContents"></div>
		</div>
		<button class="helion-circle-button CanvasApp_Button CanvasApp_ToggleDialog">${fa5_solid_times}</button>
	</helion-panel>
</helion-stack>
`;

function createElement() {
	const div = document.createElement("div");
	div.innerHTML = html;
	return div.firstElementChild as HTMLElement;
}


export class CanvasApp {
	readonly node = createElement()
	readonly infoDialog = this.node.querySelector(".CanvasApp_DialogContents") as HTMLElement;
	readonly #insertBefore = this.node.firstElementChild!;
	readonly #gitHubLink = this.node.querySelector("a") as HTMLAnchorElement;
	readonly #shareButton = this.node.querySelector(".CanvasApp_Share") as HTMLButtonElement;

	constructor() {
		const dialog = this.node.querySelector(".CanvasApp_Dialog") as HTMLElement;
		const [open,close] = this.node.querySelectorAll(".CanvasApp_ToggleDialog") as NodeListOf<HTMLButtonElement>;
		open!.onclick = () => dialog.toggleAttribute("data-opened", true);
		close!.onclick = () => dialog.toggleAttribute("data-opened", false);

		const shareData: ShareData = {
			title: document.title,
			url: location.href,
		}

		if ("canShare" in navigator && navigator.canShare(shareData)) {
			this.setShare(()=>navigator.share(shareData));
		} else {
			this.setShare(undefined);
		}
	}

	addLayer(element: HTMLElement) {
		this.node.insertBefore(element, this.#insertBefore);
	}

	setShare(share: undefined|(()=>void)) {
		this.#shareButton.style.display = share ? "" : "none";
		if (share) this.#shareButton.onclick = share;
	}

	setGithubLink(src: string) {
		this.#gitHubLink.classList.add("helion-circle-button", "CanvasApp_Button");
		this.#gitHubLink.href = src;
		this.#gitHubLink.innerHTML = fa5_brands_github;
		this.#gitHubLink.target = "_blank";
	}
}