export const Footer = (): React.ReactElement => {
    return (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
                Made by{" "}
                <a
                    href="https://github.com/marco-rosner"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Marco Rosner
                </a>
            </p>
        </footer>
    )
}