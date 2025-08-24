const crypto = require('crypto');

module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { data } = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Missing data parameter' });
        }

        // Get environment variables
        const passphrase = process.env.PAYFAST_PASSPHRASE;

        if (!passphrase) {
            console.error('Missing PayFast passphrase');
            return res.status(500).json({ error: 'PayFast configuration not available' });
        }

        // Generate signature
        const signature = generatePayFastSignature(data, passphrase);

        res.status(200).json({ signature });

    } catch (error) {
        console.error('Error generating PayFast signature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Generate PayFast signature
 */
function generatePayFastSignature(data, passphrase) {
    try {
        // PayFast signature requirements:
        // 1. All parameters must be in alphabetical order
        // 2. Only include non-empty values
        // 3. Use & as separator
        // 4. Append passphrase at the end
        // 5. Generate lowercase MD5 hash
        
        const signatureParams = [];
        
        // Add all non-empty parameters in alphabetical order (excluding signature)
        Object.keys(data).sort().forEach(key => {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined && key !== 'signature') {
                signatureParams.push(`${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`);
            }
        });
        
        // Join with & and append passphrase
        const signatureString = signatureParams.join('&') + '&passphrase=' + encodeURIComponent(passphrase);
        
        // Generate lowercase MD5 hash
        const signature = crypto.createHash('md5').update(signatureString).digest('hex').toLowerCase();
        
        console.log('Generated signature for:', JSON.stringify(data, null, 2));
        console.log('Signature string:', signatureString);
        console.log('Signature:', signature);
        
        return signature;
        
    } catch (error) {
        console.error('Error generating signature:', error);
        throw error;
    }
}
