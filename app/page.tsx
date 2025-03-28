"use client";

import Image from "next/image";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (searchParams.has("canceled")) {
                toast(
                    "Order canceled -- continue to shop around and checkout when you're ready."
                );
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [searchParams]);

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
                <h1 className="text-3xl">
                    NextJS Stripe Payment Integration Demo
                </h1>
                <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 tracking-[-.01em]">
                        See Code on GitHub{" "}
                        <a href="https://github.com/oludotun/next_js-stripe-demo">
                            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                                https://github.com/oludotun/next_js-stripe-demo
                            </code>
                        </a>
                        .
                    </li>
                    <li className="tracking-[-.01em]">
                        Click <span className="font-semibold">Pay Now</span> to
                        check it out
                    </li>
                    <li className="tracking-[-.01em]">
                        <span className="font-semibold">
                            Please Don&apos;t use your real card
                        </span>{" "}
                        You can use 4242424242424242 with any valid future date
                        and any three-digit CVC
                    </li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <form action="/api/checkout_sessions" method="POST">
                        <button
                            type="submit"
                            role="link"
                            className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        >
                            Pay Now (Checkout)
                        </button>
                    </form>
                    <a
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        href={process.env.NEXT_PUBLIC_PAYMENT_LINK}
                        rel="noopener noreferrer"
                    >
                        Pay with Payment Link
                    </a>
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
