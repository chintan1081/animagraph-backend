import fs from 'fs';
import fetch from 'node-fetch';

export async function fileUpload(path) {
    const fileContent = fs.readFileSync(path);

    const APP_KEY = 'pdt80u8u9lxxiot';
    const APP_SECRET = 'rsyblptuhb0ul5c';
    const REFRESH_TOKEN = 'your_permanent_refresh_token';

    const accessToken = 'sl.u.AF3G_i0RtkfERsrJnvWPJhzPNvVT0TjfGEvZULmJ8igyd0DvzGbPPYFB4Dc2ZK4hDnZrO4a21_3tnGulaBmKkzGRJ8Ilc3QNcxecDZ2r4ihTWSGCVxOQxk4ll9cG7vDTGDPjRlkUDD3arVCC6B5tmC4scVJA4TN4L6eMHrS2LjUfN8dpjDSxIWWfxAaPlN3JDtMuUl8szj4eEP5GTSkM-0p1utgPXdmGJKWyEYxDsNiB-yurjb5XLZ0PXML5iuUd3TysPqiVLARhqK7ewEwVBen7ALrShxcM3Sqp1oRHrf8FEdOPAkrIBAxrCFHtWFODHNLUfDJZ2i1nXK_G4XDwMg0E0v66HNCPzT6VRvfPtyK01WmHlnTRJzPdX8AGsL1xZ9RqAoibDuKQowMWBgEPYh0NqnbQR1JnZYZg2KRB6bbsbSefqvEL-eBebU_orWoQZzHAIx65BHq6IxNjEblEmrvQQ5b_5H0HQTiiqSaz89IKlcMx3jdcg8dmkybEWfz2O9EE02ZAO4aDs0SHgYJw6kUo9aSXhGI5zFYdEiKKT8vEpFnY2zF7uEAVmS3KMhn0mwiuOh35PJBn1ORhAmrYy8tFi98g55MqqCvxgVbrh_locSpnOI6xfpsuIsfeuGTshRctMC55zf-pBd38u4z8ZuKG9HeVUtIjukLkUfOLq90vPHj6JP9aL8V0y0NlLNRcpHKwH4Bz8MifqxbwVF0vOx60TKPP9SvDb13TDE4OjYTVqf4hNmmTCjMg7fp3daQe0pDRTOwXgjmhol8DkQUpcTh5vJFoLDnNN7DReCb6Pll5uN8ELV1nud7r6dPGZlo5vhOzeLSgG-MyLx_OyY5bumKhjsoGtS62oCMpMaUno4YRWZBotf7FEHb8NRb2iYHHGKbOwd0yirKPg5MsNIpczvXdol0zaOOwFTYfzJuZZKrMKiyEaXMMgczPK-QP7MixLhcDNdWER0_0FAQzXQOIegZkwKa4eYKxsTQf5tntpFAAHG6yGP0shhOauU8miyAZnfzaq-tI-N2C8T0VYwVFeSNC3xWu9DicJY1ootL1RXBiVFRsV6XZo139EZqa8ceJytJwvqqxD2UdJaosElRJhQKbjtCPrIwhAgQ8zCkIjMGIpEGEJP5Gk5PwmsmIe0heRLCsTvs1oKOAUSjRA4qAYx-xAMt350F0ZCoRLD_szCRHhzZszP-eVVwiR2_l87jhCmgi4zOw4aEfu77DExbsgCgN8YLnEiYhfjNEGkbmmM1xO81Ua4W3EZK347sFx40rNpIlP89z0ZsUfuehlwaK5SApIUZyYv9swKt5b6tSQnnQvuDPASpy-IGucjanaXW8ykmkPCl0p1vI_XRVm7PrnyCEiyauyERhwSKmG4DSHugJc3D-F0nASQ9Jca8zNDc3k__fueocL97Lce1aH57ZLLtuO17FXTruMMP_Jy5xdLs3Rw'

    const uploadRes = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: `/videos/Manim2DVideo-${Date.now()}.mp4`,
                mode: 'add',
                autorename: true,
                mute: false
            })
        },
        body: fileContent
    });

    if (!uploadRes.ok) {
        const error = await uploadRes.text();
        throw new Error(`❌ Upload failed: ${error}`);
    }

    const uploadData = await uploadRes.json();
    console.log('✅ Uploaded to:', uploadData.path_display);

    const downloadRes = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Dropbox-API-Arg': JSON.stringify({
                path: uploadData.path_display
            })
        }
    });

    if (!downloadRes.ok) {
        const error = await downloadRes.text();
        throw new Error(`❌ Download failed: ${error}`);
    }

    const blob = await downloadRes.blob();

    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return base64;

}