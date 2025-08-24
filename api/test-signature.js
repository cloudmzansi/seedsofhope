const crypto = require('crypto');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Missing data parameter' });
        }

        const passphrase = process.env.PAYFAST_PASSPHRASE;

        if (!passphrase) {
            return res.status(500).json({ error: 'PayFast passphrase not configured' });
        }

        // Generate signature using the same logic as the main endpoint
        const signatureParams = [];
        
        Object.keys(data).sort().forEach(key => {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined && key !== 'signature') {
                let value = data[key].toString().trim();
                if (value !== '') {
                    value = encodeURIComponent(value).replace(/%20/g, '+');
                    signatureParams.push(`${key}=${value}`);
                }
            }
        });
        
        const signatureString = signatureParams.join('&') + '&passphrase=' + encodeURIComponent(passphrase);
        const signature = crypto.createHash('md5').update(signatureString).digest('hex').toLowerCase();

        // Return detailed information for debugging
        res.status(200).json({
            success: true,
            signature,
            signatureString,
            parameters: signatureParams,
            data: data,
            passphraseConfigured: !!passphrase
        });

    } catch (error) {
        console.error('Error testing signature:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
