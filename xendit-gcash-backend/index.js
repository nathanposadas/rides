const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Xendit } = require('xendit-node'); // Ensure you're destructuring correctly

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Xendit Configuration
const xendit = new Xendit({
  secretKey: 'xnd_development_HKSZEeyEAR6kBgeLxhe5S3XVoJIoGFNsRwXAhfRmHqeVGpl2T3sF5aOTDiJ9bSx', // Replace with your actual API key
});

// Create GCash Payment Route
app.post('/create-gcash-payment', async (req, res) => {
  const { externalID, amount } = req.body;

  try {
    const payment = await xendit.eWallet.createEWalletCharge({
      externalID, // Unique identifier for your transaction
      amount, // Payment amount
      ewalletType: xendit.EWallet.Type.GCash,
      callbackURL: 'https://your-backend-url.com/gcash-callback', // Set this up for your callback handling
      redirectURL: 'https://your-app-url.com/payment-success',
    });

    res.status(200).json(payment);
  } catch (error) {
    console.error('Error creating GCash payment:', error);
    res.status(500).json({ error: 'Failed to create GCash payment' });
  }
});

// Payment Callback Handler
app.post('/gcash-callback', (req, res) => {
  const { external_id, status } = req.body;

  if (status === 'SUCCEEDED') {
    console.log(`Payment for ${external_id} succeeded.`);
  } else {
    console.log(`Payment for ${external_id} failed.`);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
