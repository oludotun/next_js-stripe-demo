# Stripe Payment Integration with Next.js

This demo project showcases how to integrate Stripe Payment API with a Next.js application.

## Live Demo

You can view the live demo [here https://next-js-stripe-demo.vercel.app/](https://next-js-stripe-demo.vercel.app/)

## Features

-   Server-side API route integration with Stripe
-   Client-side payment processing
-   Secure handling of payment intents
-   Support for various payment methods

## Prerequisites

-   Node.js 16.8 or later
-   Stripe account with API keys
-   Next.js 13 or later

## Getting Started

1. Clone this repository
2. Set up your environment variables:

    ```bash
    cp .env.example .env.local
    ```

    Add your Stripe API keys to `.env.local`

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## Learn More

To understand this implementation better, check out:

-   [Stripe Documentation](https://stripe.com/docs)
-   [Stripe Elements for React](https://stripe.com/docs/stripe-js/react)
-   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add your Stripe environment variables in your Vercel project settings.
