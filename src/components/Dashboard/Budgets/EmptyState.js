import Image from "next/image";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center  w-full px-4">
            <Image
                src="/empty.gif"
                alt="No items"
                width={150}
                height={150}
                className="mb-4"
            />

            <span className="text-lg text-center font-semibold">Henuz harcama ya da birikim eklenmedi.</span>
        </div>
    );
}
