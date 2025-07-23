import fs from 'fs';
import fetch from 'node-fetch';

async function fileUpload(path) {
    const fileContent = fs.readFileSync(path);

    const dropboxToken = 'sl.u.AF0GqdXqtyzFVcyIDyh53M97TD4ePkoy_H_V0J1aTZg697lQR5-6AYz71-S4MkI2W5Uh26Xg2W7DEPHuk7aIsE_sTnsmoukuVDmJ5UYHXg8rjiJqypFhzkMyUVL8cr_taO9L95XIiZcCAdXIhAWN_JHeyI7acCiVH3yUjiEXdX-7I8OsFbuy_qMD5RTY2vi-_wjjzGu9aphh5clF6U9y73u2N0QM9OrtHKh_p8mUVXcGQ5JbxoJUFepz-lPfAALsAet58ANKqvyYSzzIycTjuy66tEc1WjjF3U-DYf75fVtaRbyvVPsuA0zkhoiIIm3BDV7C4EBeZCmCepYsPV_EJDj-vvXa99RqRhu0HwdeWz7C6r77EJyC47T4xbNPNvRa2O22c36pNwvLSdb8Ro3g1VMM8tcYuvtEFCUjsS_QB6QlkRz4f-1GUcCnG3iAO-wLGrTEYw7nQJ6EtbX9xUdw0oulowSNmncZ046R6WxgdwN4VNfNNdXq0usQDCC2_qyxrfDMcby6TxAI4ZmQ6DxQlLuyfqRf_Ztmv6AnJ360jbRS9xyky_D2iFctgEWmDgQ0CFFLJp1ZWn18thprvmbZp5m_S42Or-9dU6L3RGpZ7IwRG6aZvJSpAA3aXfXN9QBvBuCLEB7R4XxQtzMepKw-Kk3v6zBDV4CcdUwfqvajKxsRhBEaN-BUKWSW9QGNoBzk0OUCp2yL3ghvusIBy-QGw7YHNL3f-BioxE4MT_FiI62JfXoCadsstQgVvRvgh8a7XOMJ5zKhD3vztm6Kya854YnI6C7Pxg9Yw5S50hjA2rxDRzg065Xop3uFayTTJ65qaKnR94FSO4Fe3JLFJiPysPVQozBxZXj4TzHBiK382tneET7Mtx4AAZ3zNaiBG_e8kSbRTZ7GgjMFV2shG6M-PkjbFCAU7mfqZtnWPykXp8j4LzhQztrBU1X3eQpJje9Xk72BxduDS9Pi_sRpieaudt_almDQa7K-9DlN7y4KFtUKqlu3iWASPKuxYbJwGwIUc1tb-bjLDkRBKzu0af63Jh1dd512iWbkXsaZNd4XpDl11XO0DXcvM0IKcwUBlnc2JCMjmeeVpsai273BNw0WJh9Ndo1Tv-hYmiisQocXtWywjAYXkREyzQKzwzsD7eE9aagY0cRSNzB9dfVKSNQuS1TdM5l3ujkUo1Emftdv8ZgwFu29BbcG9QWkNDhGpyZEYe8rUGbaTyHWhM_Ef3bkuBgjrQptpjDm8KYJEY1CzROIglrGShdoxlrV19-P_c5qJRldJFwIgAHT4ThoMhRYO4b6OmBkvolNMrNbZRigdVPoJs93CijJVJyi7AMT4Trm_QfBLvTAQImEy2pmt6osorlvl8NXusGJKkgjTPSX0GDb-6CTv9Gu0eAZYJmdJdgtcCp_U3GFDaWfDgoaF-woVdso0gIfH68gx00MAkjYspUqWQ'
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${dropboxToken}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: '/videos/Manim2DVideos.mp4',
                mode: 'add',
                autorename: true,
                mute: false
            })
        },
        body: fileContent
    });

    if (response.ok) {
        const result = await response.json();
        console.log('✅ File uploaded successfully:', result);
    } else {
        const errorText = await response.text();
        console.error('❌ Upload failed:', response.status, errorText);
    }

    const urlResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${dropboxToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            path: '/videos/Manim2DVideos.mp4',
            direct_only: true
        })
    });


    if (urlResponse.ok) {
        const result = await urlResponse.json();
        return result.url;
    } else {
        const errorText = await urlResponse.text();
        console.error('Upload failed:', urlResponse.status, errorText);
    }

}