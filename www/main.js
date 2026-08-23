const OPRINGO_URL = 'https://www.opringo.com/index';

console.log('[Opringo] Launcher started.');

setTimeout(() => {

    console.log('[Opringo] Navigating to:', OPRINGO_URL);

    window.location.href = OPRINGO_URL;

}, 500); 