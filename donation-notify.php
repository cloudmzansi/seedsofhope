<?php
/**
 * PayFast Notification Handler
 * This file handles payment notifications from PayFast
 * 
 * IMPORTANT: In production, you should:
 * 1. Verify the signature from PayFast
 * 2. Store donation data in a database
 * 3. Send confirmation emails
 * 4. Log all transactions
 */

// Set content type to text/plain for PayFast
header('Content-Type: text/plain');

// Get POST data from PayFast
$postData = $_POST;

// Log the notification (for debugging)
$logFile = 'donation_log.txt';
$logEntry = date('Y-m-d H:i:s') . " - Notification received: " . json_encode($postData) . "\n";
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// Extract key information
$paymentStatus = isset($postData['payment_status']) ? $postData['payment_status'] : '';
$paymentId = isset($postData['m_payment_id']) ? $postData['m_payment_id'] : '';
$amount = isset($postData['amount_gross']) ? $postData['amount_gross'] : '';
$email = isset($postData['email_address']) ? $postData['email_address'] : '';
$firstName = isset($postData['name_first']) ? $postData['name_first'] : '';
$lastName = isset($postData['name_last']) ? $postData['name_last'] : '';
$customMessage = isset($postData['custom_str1']) ? $postData['custom_str1'] : '';

// Verify payment status
if ($paymentStatus === 'COMPLETE') {
    // Payment was successful
    
    // TODO: In production, verify the signature here
    // $signature = generatePayFastSignature($postData, 'YOUR_MERCHANT_KEY');
    // if ($signature !== $postData['signature']) {
    //     http_response_code(400);
    //     echo "Invalid signature";
    //     exit;
    // }
    
    // Process successful donation
    processSuccessfulDonation($paymentId, $amount, $email, $firstName, $lastName, $customMessage);
    
    // Respond to PayFast
    echo "OK";
    
} else {
    // Payment failed or was cancelled
    logDonationFailure($paymentId, $paymentStatus);
    
    // Respond to PayFast
    echo "OK";
}

/**
 * Process a successful donation
 */
function processSuccessfulDonation($paymentId, $amount, $email, $firstName, $lastName, $customMessage) {
    // TODO: In production, store in database
    $donationData = [
        'payment_id' => $paymentId,
        'amount' => $amount,
        'email' => $email,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'message' => $customMessage,
        'status' => 'completed',
        'date' => date('Y-m-d H:i:s')
    ];
    
    // Log successful donation
    $logFile = 'successful_donations.txt';
    $logEntry = date('Y-m-d H:i:s') . " - Successful donation: " . json_encode($donationData) . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    
    // TODO: Send confirmation email
    sendDonationConfirmation($email, $firstName, $lastName, $amount, $paymentId);
    
    // TODO: Update donation statistics
    updateDonationStats($amount);
}

/**
 * Log donation failure
 */
function logDonationFailure($paymentId, $status) {
    $logFile = 'failed_donations.txt';
    $logEntry = date('Y-m-d H:i:s') . " - Failed donation: Payment ID: $paymentId, Status: $status\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Send donation confirmation email
 */
function sendDonationConfirmation($email, $firstName, $lastName, $amount, $paymentId) {
    $subject = "Thank you for your donation to Seeds of Hope Queensburgh";
    
    $message = "
    Dear $firstName $lastName,
    
    Thank you for your generous donation of R$amount to Seeds of Hope Queensburgh.
    
    Your donation will help us provide nutritious meal packs to families in need in our community.
    
    Payment Details:
    - Payment ID: $paymentId
    - Amount: R$amount
    - Date: " . date('d/m/Y H:i') . "
    
    Your donation is tax deductible. Please keep this email as your receipt.
    
    Thank you for making a difference in our community.
    
    Warm regards,
    The Seeds of Hope Queensburgh Team
    
    ---
    Seeds of Hope Queensburgh
    Email: info@seedsofhopequeensburgh.org.za
    Phone: +27 31 123 4567
    ";
    
    $headers = "From: Seeds of Hope Queensburgh <noreply@seedsofhopequeensburgh.org.za>\r\n";
    $headers .= "Reply-To: info@seedsofhopequeensburgh.org.za\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // TODO: In production, use a proper email service
    // mail($email, $subject, $message, $headers);
    
    // For now, just log the email
    $logFile = 'email_log.txt';
    $logEntry = date('Y-m-d H:i:s') . " - Confirmation email sent to: $email\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Update donation statistics
 */
function updateDonationStats($amount) {
    // TODO: In production, update database statistics
    // This could include total donations, number of donors, etc.
    
    $statsFile = 'donation_stats.json';
    $stats = [];
    
    if (file_exists($statsFile)) {
        $stats = json_decode(file_get_contents($statsFile), true);
    }
    
    // Update stats
    $stats['total_donations'] = isset($stats['total_donations']) ? $stats['total_donations'] + 1 : 1;
    $stats['total_amount'] = isset($stats['total_amount']) ? $stats['total_amount'] + $amount : $amount;
    $stats['last_updated'] = date('Y-m-d H:i:s');
    
    file_put_contents($statsFile, json_encode($stats, JSON_PRETTY_PRINT));
}

/**
 * Generate PayFast signature (for verification)
 */
function generatePayFastSignature($data, $merchantKey) {
    // Create signature string (PayFast specific format)
    $signatureData = [
        $data['merchant_id'],
        $data['m_payment_id'],
        $data['name_first'],
        $data['name_last'],
        $data['email_address'],
        $data['amount'],
        $data['item_name']
    ];
    
    $signatureString = implode('&', $signatureData);
    
    // In production, use MD5 hash
    return md5($signatureString . $merchantKey);
}
?>
