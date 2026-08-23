const OPRINGO_URL = 'https://www.opringo.com/index';

async function hideSplash() {

    try {

        await Capacitor.Plugins.SplashScreen.hide();

        console.log('[Opringo] Splash hidden.');

    } catch (error) {

        console.error('[Opringo] Splash hide error:', error);

    }
}


async function launchOpringo() {

    console.log('[Opringo] Launcher started.');

    try {

        const network =
            await Capacitor.Plugins.Network.getStatus();

        console.log('[Opringo] Network:', network);


        // ---------------------------------------------------------
        // OFFLINE
        // ---------------------------------------------------------

        if (!network.connected) {

            console.log('[Opringo] Device is offline.');

            await hideSplash();

            window.location.replace('./offline.html');

            return;
        }


        // ---------------------------------------------------------
        // ONLINE
        // ---------------------------------------------------------

        console.log('[Opringo] Device is online.');

        await hideSplash();

        console.log('[Opringo] Opening Opringo inside app...');

        window.location.href = OPRINGO_URL;

    } catch (error) {

        console.error('[Opringo] Launch error:', error);

        await hideSplash();

        window.location.replace('./offline.html');
    }
}


launchOpringo();