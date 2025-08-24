module.exports = async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Return only the necessary configuration for client-side
        const config = {
            merchant_id: process.env.PAYFAST_MERCHANT_ID,
            merchant_key: process.env.PAYFAST_MERCHANT_KEY,
            return_url: process.env.PAYFAST_RETURN_URL || `${req.headers.origin}/donation-success.html`,
            cancel_url: process.env.PAYFAST_CANCEL_URL || `${req.headers.origin}/donation-cancelled.html`,
            notify_url: process.env.PAYFAST_NOTIFY_URL || `${req.headers.origin}/api/payfast-notify`
        };

        // Validate that required fields are present
        if (!config.merchant_id || !config.merchant_key) {
            console.error('Missing required PayFast configuration');
            return res.status(500).json({ error: 'PayFast configuration not available' });
        }

        res.status(200).json(config);

    } catch (error) {
        console.error('Error getting PayFast configuration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
