const graphInput = document.getElementById('graph-input');

graphInput.addEventListener('keydown', (event) => {
    const openBrackets = ['[', '{', '('];
    const closeBrackets = [']', '}', ')'];

    if (openBrackets.includes(event.key)) {
        event.preventDefault();

        const start = graphInput.selectionStart;
        const end = graphInput.selectionEnd;
        const openBracket = event.key;
        const closeBracket = closeBrackets[openBrackets.indexOf(event.key)];

        const textBefore = graphInput.value.substring(0, start);
        const textAfter = graphInput.value.substring(end);
        graphInput.value = `${textBefore}${openBracket}${closeBracket}${textAfter}`;
        graphInput.selectionStart = graphInput.selectionEnd = start + 1;
    }
});
