const crypto = require('crypto');

module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get POST data from PayFast
        const postData = req.body;

        // Log the notification (for debugging)
        console.log('PayFast notification received:', JSON.stringify(postData, null, 2));

        // Extract key information
        const paymentStatus = postData.payment_status || '';
        const paymentId = postData.m_payment_id || '';
        const amount = postData.amount_gross || '';
        const email = postData.email_address || '';
        const firstName = postData.name_first || '';
        const lastName = postData.name_last || '';
        const customMessage = postData.custom_str1 || '';
        const signature = postData.signature || '';

        // Verify the signature
        const isValidSignature = verifyPayFastSignature(postData, signature);
        
        if (!isValidSignature) {
            console.error('Invalid PayFast signature');
            return res.status(400).send('Invalid signature');
        }

        // Verify payment status
        if (paymentStatus === 'COMPLETE') {
            // Payment was successful
            await processSuccessfulDonation(paymentId, amount, email, firstName, lastName, customMessage);
            
            // Respond to PayFast
            res.status(200).send('OK');
        } else {
            // Payment failed or was cancelled
            await logDonationFailure(paymentId, paymentStatus);
            
            // Respond to PayFast
            res.status(200).send('OK');
        }

    } catch (error) {
        console.error('Error processing PayFast notification:', error);
        res.status(500).send('Internal server error');
    }
}

/**
 * Verify PayFast signature
 */
function verifyPayFastSignature(data, submittedSignature) {
    try {
        // Get environment variables
        const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
        const passphrase = process.env.PAYFAST_PASSPHRASE;

        if (!merchantKey || !passphrase) {
            console.error('Missing PayFast environment variables');
            return false;
        }

        // Create signature string (PayFast specific format)
        const signatureParams = [];
        
        // Add all non-empty parameters in alphabetical order (excluding signature)
        Object.keys(data).sort().forEach(key => {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined && key !== 'signature') {
                signatureParams.push(`${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`);
            }
        });
        
        // Join with & and append passphrase
        const signatureString = signatureParams.join('&') + '&passphrase=' + encodeURIComponent(passphrase);
        
        // Generate MD5 hash
        const calculatedSignature = crypto.createHash('md5').update(signatureString).digest('hex').toLowerCase();
        
        console.log('Calculated signature:', calculatedSignature);
        console.log('Submitted signature:', submittedSignature);
        
        return calculatedSignature === submittedSignature.toLowerCase();
        
    } catch (error) {
        console.error('Error verifying signature:', error);
        return false;
    }
}

/**
 * Process a successful donation
 */
async function processSuccessfulDonation(paymentId, amount, email, firstName, lastName, customMessage) {
    try {
        const donationData = {
            payment_id: paymentId,
            amount: parseFloat(amount),
            email: email,
            first_name: firstName,
            last_name: lastName,
            message: customMessage,
            status: 'completed',
            date: new Date().toISOString()
        };

        console.log('Processing successful donation:', donationData);

        // TODO: In production, store in database
        // For now, we'll just log it
        console.log('Donation processed successfully:', JSON.stringify(donationData, null, 2));

        // TODO: Send confirmation email
        // await sendDonationConfirmation(email, firstName, lastName, amount, paymentId);

        // TODO: Update donation statistics
        // await updateDonationStats(amount);

    } catch (error) {
        console.error('Error processing successful donation:', error);
        throw error;
    }
}

/**
 * Log donation failure
 */
async function logDonationFailure(paymentId, status) {
    try {
        console.log(`Donation failed: Payment ID: ${paymentId}, Status: ${status}`);
        
        // TODO: In production, log to database
        // For now, we'll just log it to console
        
    } catch (error) {
        console.error('Error logging donation failure:', error);
        throw error;
    }
}

/**
 * Send donation confirmation email
 */
async function sendDonationConfirmation(email, firstName, lastName, amount, paymentId) {
    try {
        const subject = "Thank you for your donation to Seeds of Hope Queensburgh";
        
        const message = `
Dear ${firstName} ${lastName},

Thank you for your generous donation of R${amount} to Seeds of Hope Queensburgh.

Your donation will help us provide nutritious meal packs to families in need in our community.

Payment Details:
- Payment ID: ${paymentId}
- Amount: R${amount}
- Date: ${new Date().toLocaleDateString('en-ZA')}

Your donation is tax deductible. Please keep this email as your receipt.

Thank you for making a difference in our community.

Warm regards,
The Seeds of Hope Queensburgh Team

---
Seeds of Hope Queensburgh
Email: info@seedsofhopequeensburgh.org.za
Phone: +27 31 123 4567
        `;

        // TODO: In production, use a proper email service like SendGrid, Mailgun, etc.
        console.log('Confirmation email would be sent to:', email);
        console.log('Email content:', message);

    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}

/**
 * Update donation statistics
 */
async function updateDonationStats(amount) {
    try {
        // TODO: In production, update database statistics
        // This could include total donations, number of donors, etc.
        console.log(`Updating donation stats with amount: R${amount}`);
        
    } catch (error) {
        console.error('Error updating donation stats:', error);
        throw error;
    }
}
