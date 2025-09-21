import Image from "next/image";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-12">
            <div className="mb-6 relative">
                <Image
                    src="/empty.gif"
                    alt="No items"
                    width={150}
                    height={150}
                    className="mb-4"
                />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Henuz herhangi bir islem eklenmedi</h3>
                <p className="text-slate-600 max-w-md">
                    Ilk harcama veya birikim isleminizi ekleyerek baslayin ve finansal yolculugunuzu takip edin.
                </p>
            </div>
        </div>
    );
}
