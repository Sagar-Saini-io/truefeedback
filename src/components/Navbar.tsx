"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
    const { data: session } = useSession();

    const user: User = session?.user as User;

    return (
        <nav className="p-4 md:p-5 shadow-md  bg-zinc-100 ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a className="text-xl font-bold mb-4 md:mb-0" href="/">
                    true feedback
                </a>
                {session ? (
                    <>
                        <span className="text-xl font-bold">
                            Welcome, {user?.username || user?.email}{" "}
                        </span>

                        <Button
                            className="w-auto mt-4 md:mt-0"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className=" w-full md:w-auto">Login</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
