import { locationHandler } from "./config/routing";
(async function validateRedirect() {
        setTimeout(async () => {
                await locationHandler()
        }, 500);
})()

