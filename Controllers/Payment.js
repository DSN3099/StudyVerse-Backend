import Stripe from 'stripe';

const stripe = Stripe('sk_test_51MslkwSCTRdFNjKmhsfx5VnDxWQulY7qKoFfjfuaDLAcutmYpJiDejYdRL0Dczw6XgfvYyuaxZABL211oXtUlI1200PqfLBwO6')

const calculateOrderAmount = (items) => {
    var total = 0;
    items.map((val)=>{
        total = total + val.price
    })
    return total;
};

export const createPaymentIntent = async (req, res, next) => {
    const {orderdetails} = req.body;
    const amount = calculateOrderAmount(orderdetails)
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            grandTotal: amount
        });
    }catch(err){
        res.status(400).json(err)
    }
}