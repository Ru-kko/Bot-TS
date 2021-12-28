import { RefObject } from "react";

export default async (
	ref: RefObject<HTMLElement>,
	text: String,
	callback?: () => void
): Promise<void> => {
	const splitedText = text.split("");

	await new Promise<void>((resolve) => {
		var lineCounter = 0;
		let intervalLine = setInterval(() => {
			if (lineCounter % 2 == 0) 
				ref.current!.innerText = "|"; 
			else 
				ref.current!.innerText = " ";
			lineCounter++;
			if (lineCounter >= 7) {
				clearInterval(intervalLine)
				resolve()
			};
		}, 500);
	});
	await new Promise<void>((resolve) => {
		var textIndex = 0;


		let textInterval = setInterval(() => {
			if (textIndex >= splitedText.length - 1) {
				clearInterval(textInterval);
				setTimeout(() => {
					resolve()
				}, 500);
			}

			ref.current!.innerText = ref.current!.innerText.slice(0, -1) + splitedText[textIndex] + "|";
			
			textIndex ++;
		}, 150);
	});
	
	if(callback)
		callback();
}