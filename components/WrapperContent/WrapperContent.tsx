import React from "react";

export const WrapperContent = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
        <div className="animate-in flex-1 flex flex-col mt-5 opacity-0 max-w-4xl">
            {children}
        </div>
    </div>
)