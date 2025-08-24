# PayFast Signature Troubleshooting Guide

## Common Issues and Solutions

### 1. "Generated signature does not match submitted signature" Error

This is the most common error and can be caused by several factors:

#### A. Environment Variables Not Set
**Problem**: Missing or incorrect environment variables
**Solution**: 
1. Check your Vercel environment variables:
   - `PAYFAST_MERCHANT_ID`
   - `PAYFAST_MERCHANT_KEY` 
   - `PAYFAST_PASSPHRASE`

2. Use the test page to verify configuration:
   ```
   https://your-domain.vercel.app/test-payfast.html
   ```

#### B. Incorrect Passphrase
**Problem**: Passphrase doesn't match what's configured in PayFast
**Solution**:
1. Log into your PayFast merchant dashboard
2. Check your passphrase settings
3. Ensure it matches exactly in your environment variables

#### C. Parameter Order Issues
**Problem**: Parameters not in alphabetical order
**Solution**: The signature generation code has been updated to ensure proper ordering

#### D. Empty Values
**Problem**: Empty or null values included in signature
**Solution**: The code now filters out empty values before signature generation

#### E. URL Encoding Issues
**Problem**: Incorrect URL encoding of parameters
**Solution**: Updated to use proper URL encoding with + for spaces

### 2. Testing Your Integration

#### Step 1: Test Configuration
Visit `/test-payfast.html` and click "Test Configuration" to verify:
- Environment variables are set
- API endpoints are accessible
- Configuration is loaded correctly

#### Step 2: Test Signature Generation
Click "Test Signature Generation" to:
- Verify signature generation works
- See the exact signature string being generated
- Check parameter ordering

#### Step 3: Test Full Donation
Click "Test Full Donation" to:
- Test the complete flow
- Use PayFast sandbox for safe testing
- Verify form submission

### 3. Development vs Production

#### Development (localhost)
- Uses test merchant credentials
- Points to PayFast sandbox
- Includes fallback configuration

#### Production
- Uses live merchant credentials
- Points to live PayFast
- Loads configuration from environment variables

### 4. Debug Information

The updated code includes extensive logging:

#### Client-side Logging
- PayFast configuration loading
- Form data being submitted
- Error handling

#### Server-side Logging
- Signature generation details
- Parameter processing
- Error messages

### 5. Environment Variable Checklist

Ensure these are set in your Vercel dashboard:

```
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_RETURN_URL=https://your-domain.vercel.app/donation-success.html
PAYFAST_CANCEL_URL=https://your-domain.vercel.app/donation-cancelled.html
PAYFAST_NOTIFY_URL=https://your-domain.vercel.app/api/payfast-notify
```

### 6. PayFast Dashboard Configuration

In your PayFast merchant dashboard:

1. **Notification URL**: Set to your notify endpoint
2. **Return URL**: Set to your success page
3. **Cancel URL**: Set to your cancelled page
4. **Passphrase**: Must match your environment variable

### 7. Common Fixes Applied

1. **Improved signature generation**:
   - Better parameter filtering
   - Proper URL encoding
   - Enhanced error handling

2. **Better error handling**:
   - Fallback configurations
   - Detailed error messages
   - Graceful degradation

3. **Enhanced debugging**:
   - Test endpoints
   - Detailed logging
   - Configuration validation

### 8. Testing Checklist

Before going live:

- [ ] Environment variables configured
- [ ] PayFast dashboard settings updated
- [ ] Test page working correctly
- [ ] Signature generation successful
- [ ] Sandbox payment flow working
- [ ] Notification endpoint accessible
- [ ] Success/cancel pages working

### 9. Getting Help

If you're still experiencing issues:

1. Check the browser console for errors
2. Review Vercel function logs
3. Use the test page to isolate the problem
4. Verify PayFast documentation
5. Contact PayFast support if needed

### 10. Recent Updates

The following files have been updated to fix signature issues:

- `api/payfast-signature.js` - Improved signature generation
- `script.js` - Better error handling and debugging
- `api/test-signature.js` - New test endpoint
- `test-payfast.html` - New test page

These updates should resolve the signature mismatch error you were experiencing.
