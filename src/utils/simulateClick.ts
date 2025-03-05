// this util tries to mimic a truthy click event
// because element.click() doesn't work on FB
// but it's not working rn...

export const simulateClickScript = (elementPath: string) => {
	const script = `
(() => {
    const element = document.querySelector('${elementPath}');
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        // Simulate "trusted" properties
        clientX: element.getBoundingClientRect().x,
        clientY: element.getBoundingClientRect().y,
    });
    element.dispatchEvent(event);
    return 'clicked ' + element;
})()
`;
	return script;
};
