hljs.registerLanguage('douglang', function (hljs) {
    return {
        name: 'Douglang',
        contains: [
            { className: 'keyword', begin: /\+set|-set|\*set|\/set|%set|set|tts|prediction|Believers|Doubters|win|loop|guoD|Rigged/ },
            { className: 'keyword', begin: /(Doug)+/ },
            { className: 'keyword', begin: /Bald/ },
            { className: 'number', begin: /(\d+(\.\d+)?|\.\d+)/, relevance: 0 },
            hljs.QUOTE_STRING_MODE,
            { className: 'comment', begin: /D:/, end: /:D/ },
        ]
    };
});

// Highlight inline code blocks
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.language-douglang').forEach((el) => hljs.highlightElement(el));
});

// What? No, the eyes don't move.
document.addEventListener("DOMContentLoaded", () => {
    const pepper = document.getElementById("pepper");

    const IDLE_IMAGE = "/assets/pepper.png";
    const PEEK_IMAGE = "/assets/pepper_peek.webp";

    const DURATION = 5430;
    const MIN_DELAY = 5000;
    const MAX_DELAY = 15000;

    pepper.src = IDLE_IMAGE;

    function randomDelay() {
        return Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    }

    function playPepperPeek() {
        pepper.src = `${PEEK_IMAGE}?${Date.now()}`;

        setTimeout(() => {
            pepper.src = IDLE_IMAGE;

            setTimeout(playPepperPeek, randomDelay());
        }, DURATION);
    }

    setTimeout(playPepperPeek, randomDelay());
});