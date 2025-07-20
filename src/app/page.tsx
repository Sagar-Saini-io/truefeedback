"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel";

import messages from "@/data/messages.json";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";
import { ColourfulText } from "@/components/ui/colourful-text";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className=" h-screen rounded-2xl flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-zinc-950 text-white">
                <section className="  text-center mb-14 md:mb-24 ">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        <ColourfulText
                            text="Dive into the World of Anonymous Feedback"
                            color="rgb(242, 242, 228)"
                        />
                    </h1>
                    <p className="mt-6 md:mt-4 text-base md:text-lg">
                        True Feedback - Where your identity remains a secret.{" "}
                        <br></br>
                        <a
                            className="no-underline hover:underline text-blue-300"
                            href="/dashboard"
                        >
                            Go to the dashboard
                        </a>
                    </p>
                </section>
                <div>
                    <Carousel
                        plugins={[Autoplay({ delay: 2000 })]}
                        // className="w-full max-w-xs"
                        className="w-full max-w-sm md:max-w-md  "
                    >
                        <CarouselContent>
                            {messages.map((message, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1 ">
                                        <Card className="bg-blue-100">
                                            <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 p-6 ">
                                                <Mail className="flex-shrink-0" />
                                                <div>
                                                    <p className="text-xl">
                                                        {message.content}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {message.received}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {/* <CarouselPrevious /> */}
                        {/* <CarouselNext /> */}
                    </Carousel>
                </div>
            </main>

            <footer className="text-center p-4 md:p-6 bg-zinc-900 text-white">
                © 2025 True Feedback. All rights reserved.
            </footer>
        </>
    );
}
