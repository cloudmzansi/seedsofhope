# PayFast Integration Setup Guide

This guide will help you set up the PayFast payment integration with Vercel environment variables.

## Prerequisites

1. A PayFast merchant account (live, not sandbox)
2. Your PayFast merchant credentials
3. A Vercel account and project

## Environment Variables Setup

### 1. Get Your PayFast Credentials

Log into your PayFast merchant dashboard and get the following information:
- **Merchant ID**: Your unique merchant identifier
- **Merchant Key**: Your merchant key for API access
- **Passphrase**: Your custom passphrase for signature generation

### 2. Set Up Vercel Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to the "Environment Variables" section
3. Add the following variables:

```
PAYFAST_MERCHANT_ID=your_merchant_id_here
PAYFAST_MERCHANT_KEY=your_merchant_key_here
PAYFAST_PASSPHRASE=your_passphrase_here
PAYFAST_RETURN_URL=https://your-domain.vercel.app/donation-success.html
PAYFAST_CANCEL_URL=https://your-domain.vercel.app/donation-cancelled.html
PAYFAST_NOTIFY_URL=https://your-domain.vercel.app/api/payfast-notify
```

### 3. URL Configuration

Replace `your-domain.vercel.app` with your actual Vercel domain in the URLs above.

## PayFast Dashboard Configuration

### 1. Notification URL
In your PayFast merchant dashboard:
- Set the **Notification URL** to: `https://your-domain.vercel.app/api/payfast-notify`
- This URL will receive payment confirmations from PayFast

### 2. Return URLs
- **Return URL**: `https://your-domain.vercel.app/donation-success.html`
- **Cancel URL**: `https://your-domain.vercel.app/donation-cancelled.html`

## Testing

### 1. Test Mode
Before going live, you can test with PayFast's sandbox:
- Use sandbox credentials in your environment variables
- Test the complete payment flow

### 2. Live Mode
When ready for production:
- Update environment variables with live credentials
- Ensure all URLs are using HTTPS
- Test with a small donation amount first

## Security Notes

1. **Never commit environment variables** to your repository
2. **Use HTTPS** for all URLs in production
3. **Verify signatures** on all incoming notifications
4. **Log all transactions** for audit purposes

## Troubleshooting

### Common Issues

1. **Signature Mismatch Error**
   - Ensure passphrase is correct
   - Check that parameters are in alphabetical order
   - Verify URL encoding is correct

2. **400 Bad Request**
   - Check all required fields are present
   - Verify merchant ID and key are correct
   - Ensure URLs are properly formatted

3. **Notification URL Not Working**
   - Check Vercel function logs
   - Verify the API endpoint is accessible
   - Ensure proper CORS configuration

### Debug Mode

The code includes console logging for debugging:
- Check browser console for client-side errors
- Check Vercel function logs for server-side errors
- Monitor PayFast notification logs

## Support

If you encounter issues:
1. Check PayFast's official documentation
2. Review Vercel function logs
3. Test with PayFast's sandbox first
4. Contact PayFast support if needed

## Files Modified

- `script.js` - Updated PayFast integration
- `api/payfast-config.js` - Configuration endpoint
- `api/payfast-signature.js` - Signature generation
- `api/payfast-notify.js` - Payment notification handler
- `vercel.json` - Vercel configuration
- `package.json` - Dependencies

## Next Steps

After setup:
1. Deploy to Vercel
2. Test the donation flow
3. Monitor payment notifications
4. Set up email confirmations (optional)
5. Configure database storage (optional)
