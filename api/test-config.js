module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const config = {
            merchant_id: process.env.PAYFAST_MERCHANT_ID,
            merchant_key: process.env.PAYFAST_MERCHANT_KEY,
            has_passphrase: !!process.env.PAYFAST_PASSPHRASE,
            return_url: process.env.PAYFAST_RETURN_URL,
            cancel_url: process.env.PAYFAST_CANCEL_URL,
            notify_url: process.env.PAYFAST_NOTIFY_URL
        };

        const status = {
            has_merchant_id: !!config.merchant_id,
            has_merchant_key: !!config.merchant_key,
            has_passphrase: config.has_passphrase,
            has_return_url: !!config.return_url,
            has_cancel_url: !!config.cancel_url,
            has_notify_url: !!config.notify_url,
            all_configured: config.has_merchant_id && config.has_merchant_key && config.has_passphrase
        };

        res.status(200).json({
            status,
            config: status.all_configured ? config : null
        });

    } catch (error) {
        console.error('Error testing configuration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
