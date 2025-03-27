import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../lib/stripe";

export async function POST() {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: "price_1R7GxxE5eTgMlW33SeFhcuZP",
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
        });
        if (!session.url) throw new Error("Session URL is missing");
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
