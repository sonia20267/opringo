import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

const OPRINGO_URL = 'https://www.opringo.com/index';
const OPRINGO_INITIALIZED_KEY = 'opringo_initialized';

async function launchOpringo() {

    try {

        // Check whether Opringo has been opened successfully before
        const stored = await Preferences.get({
            key: OPRINGO_INITIALIZED_KEY
        });

        const hasLoadedBefore = stored.value === 'true';

        console.log(
            '[Opringo] Loaded before:',
            hasLoadedBefore
        );


        // Check network
        const network = await Network.getStatus();

        console.log(
            '[Opringo] Network:',
            network
        );


        // ---------------------------------------------------------
        // OFFLINE
        // ---------------------------------------------------------

        if (!network.connected) {

            console.log('[Opringo] Device is offline');

            if (hasLoadedBefore) {

                console.log(
                    '[Opringo] Previous installation detected.'
                );

                // Let Opringo's service worker/cache try to handle it
                window.location.replace(OPRINGO_URL);

            } else {

                console.log(
                    '[Opringo] First launch while offline.'
                );

                window.location.replace('offline.html');
            }

            return;
        }


        // ---------------------------------------------------------
        // ONLINE
        // ---------------------------------------------------------

        console.log(
            '[Opringo] Device is online.'
        );


        /*
         * We don't use fetch()/HEAD here.
         *
         * The browser may reject fetch because of CORS even
         * though normal navigation to Opringo works.
         */

        await Preferences.set({
            key: OPRINGO_INITIALIZED_KEY,
            value: 'true'
        });


        console.log(
            '[Opringo] Launching Opringo...'
        );


        window.location.replace(OPRINGO_URL);

    } catch (error) {

        console.error(
            '[Opringo] Launch error:',
            error
        );


        // Try to determine whether Opringo was previously initialized
        try {

            const stored = await Preferences.get({
                key: OPRINGO_INITIALIZED_KEY
            });

            const hasLoadedBefore = stored.value === 'true';


            if (hasLoadedBefore) {

                console.log(
                    '[Opringo] Falling back to cached Opringo.'
                );

                window.location.replace(OPRINGO_URL);

            } else {

                console.log(
                    '[Opringo] Falling back to offline page.'
                );

                window.location.replace('offline.html');
            }

        } catch (fallbackError) {

            console.error(
                '[Opringo] Fallback error:',
                fallbackError
            );

            window.location.replace('offline.html');
        }
    }
}


launchOpringo();