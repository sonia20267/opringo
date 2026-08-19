import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

const OPRINGO_URL = 'https://www.opringo.com/index';

const OPRINGO_INITIALIZED_KEY = 'opringo_initialized';

async function launchOpringo() {

    try {

        /*
        |--------------------------------------------------------------------------
        | Check whether Opringo has successfully loaded before
        |--------------------------------------------------------------------------
        */

        const stored = await Preferences.get({
            key: OPRINGO_INITIALIZED_KEY
        });

        const hasLoadedBefore = stored.value === 'true';


        console.log(
            '[Opringo] Loaded before:',
            hasLoadedBefore
        );


        /*
        |--------------------------------------------------------------------------
        | Check device network
        |--------------------------------------------------------------------------
        */

        const network = await Network.getStatus();

        console.log(
            '[Opringo] Network:',
            network
        );


        /*
        |--------------------------------------------------------------------------
        | OFFLINE
        |--------------------------------------------------------------------------
        */

        if (!network.connected) {

            if (hasLoadedBefore) {

                /*
                 * We have used Opringo before.
                 *
                 * Try opening Opringo so its Service Worker /
                 * cached resources can handle the request.
                 */

                console.log(
                    '[Opringo] Offline - attempting cached Opringo'
                );

                window.location.replace(
                    OPRINGO_URL
                );

            } else {

                /*
                 * First launch + offline.
                 *
                 * Nothing has been cached yet.
                 */

                console.log(
                    '[Opringo] First launch while offline'
                );

                window.location.replace(
                    'offline.html'
                );
            }

            return;
        }


        /*
        |--------------------------------------------------------------------------
        | ONLINE
        |--------------------------------------------------------------------------
        |
        | Check that Opringo itself is reachable.
        |
        */

        const response = await fetch(
            OPRINGO_URL,
            {
                method: 'HEAD',
                cache: 'no-store'
            }
        );


        if (!response.ok) {

            throw new Error(
                'Opringo returned HTTP ' +
                response.status
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Opringo is reachable
        |--------------------------------------------------------------------------
        |
        | Remember that the app has successfully connected before.
        |
        */

        await Preferences.set({
            key: OPRINGO_INITIALIZED_KEY,
            value: 'true'
        });


        console.log(
            '[Opringo] Server reachable'
        );


        /*
        |--------------------------------------------------------------------------
        | Launch Opringo
        |--------------------------------------------------------------------------
        */

        window.location.replace(
            OPRINGO_URL
        );


    } catch (error) {

        console.error(
            '[Opringo] Launch error:',
            error
        );


        /*
        |--------------------------------------------------------------------------
        | If Opringo cannot be reached
        |--------------------------------------------------------------------------
        */

        const stored = await Preferences.get({
            key: OPRINGO_INITIALIZED_KEY
        });

        const hasLoadedBefore = stored.value === 'true';


        if (hasLoadedBefore) {

            /*
             * Try Opringo anyway.
             *
             * If its Service Worker has cached the page,
             * it may be able to serve it.
             */

            window.location.replace(
                OPRINGO_URL
            );

        } else {

            window.location.replace(
                'offline.html'
            );

        }

    }

}


launchOpringo();