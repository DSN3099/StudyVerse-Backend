import express from "express";
import stripe from "stripe";


export const stripePayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "rupees",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).send({ error: stripeError });
      } else {
        res.status(200).send({ success: stripeResponse });
      }
    }
  );
};


