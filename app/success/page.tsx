import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { stripe } from "../lib/stripe";

interface SearchParams {
    session_id: string;
}

export default async function Success({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error("Please provide a valid session_id (`cs_test_...`)");

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    const { status } = session;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) throw new Error("Customer email not found");

    if (status === "open") {
        return redirect("/");
    }

    if (status === "complete") {
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <a href="https://github.com/oludotun">
                        <Image
                            className="dark:invert rounded-full"
                            src="https://github.com/oludotun.png"
                            alt="Next.js logo"
                            width={90}
                            height={90}
                            priority
                        />
                    </a>
                    <h1 className="text-3xl">Thank you for your purchase</h1>
                    <section id="success">
                        <p>
                            We appreciate your business! A confirmation email
                            will be sent to {customerEmail}. If you have any
                            questions, please email{" "}
                        </p>
                        <a href="mailto:orders@example.com">
                            orders@example.com
                        </a>
                        .
                    </section>

                    <div className="flex gap-4 items-center flex-col sm:flex-row">
                        <Link
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                            href="/"
                            rel="noopener noreferrer"
                        >
                            Back Home
                        </Link>
                    </div>
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/file.svg"
                            alt="File icon"
                            width={16}
                            height={16}
                        />
                        Learn
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                        />
                        Examples
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            aria-hidden
                            src="/globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                        />
                        Go to nextjs.org →
                    </a>
                </footer>
            </div>
        );
    }
}
