export const Title = ({ title }: { title: string }): React.ReactElement => (
    <div className="flex flex-col items-center">
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
            {title}
        </p>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
)