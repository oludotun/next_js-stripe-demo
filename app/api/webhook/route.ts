import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
    const payload = await req.text();
    const res = JSON.parse(payload);

    const sig = req.headers.get("stripe-signature");

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        const obj = res?.data?.object;
        const responseData = {
            email: obj?.billing_details?.email,
            amount: obj?.amount,
            date: new Date(res?.created * 1000).toLocaleDateString(),
            details: JSON.stringify(res),
        };
        // Send this to the database instead of login it
        console.log(responseData);

        return NextResponse.json({
            status: "success",
            event: event.type,
        });
    } catch (err) {
        return NextResponse.json({ status: "webhook_error", err });
    }
}
