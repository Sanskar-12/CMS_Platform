import Stripe from "stripe"

export const stripe=new Stripe(process.env.STRIPEAPIKEY!,{
    apiVersion:"2024-04-10",
    typescript:true
})