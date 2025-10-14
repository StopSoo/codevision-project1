import React from "react";
import Link from "next/link";
import Header from "../common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            <Header pharmacy={true} />
            <main className="px-[66px] py-[80px] w-full min-h-screen">{children}</main>
        </div>
    );
}
