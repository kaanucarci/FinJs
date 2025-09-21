import {useEffect, useState} from "react";
import NewBudgetItem from "./NewBudgetItem";
import EditBudget from "./EditBudget";

export default function BudgetInfo({budgetInfo, token}) {
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState(budgetInfo);
    const [isOpenEditBudget, setIsOpenEditBudget] = useState(false);

    useEffect(() => {
        setInfo(budgetInfo);
    }, [budgetInfo]);

    return (
        <>
            <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
                <div className="w-full shadow-modern-lg bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
                    <div className="grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 grid gap-6 p-6">
                        <div className="flex gap-3 justify-start group">
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <svg
                                    className="text-blue-600"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                                          clipRule="evenodd"></path>
                                    <path fillRule="evenodd"
                                          d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                          clipRule="evenodd"></path>
                                    <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-slate-600 text-sm">Toplam Butce</span>
                                <span className="font-bold text-slate-900 text-lg">₺ {info?.totalAmount}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start group">
                            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <svg
                                    className="text-green-600"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-slate-600 text-sm">Kalan Butce</span>
                                <span className="font-bold text-slate-900 text-lg">₺ {info?.amount}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start group">
                            <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <svg
                                    className="text-red-600"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-slate-600 text-sm">Toplam Harcama</span>
                                <span className="font-bold text-slate-900 text-lg">₺ {info?.expense}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start group">
                            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <svg
                                    className="text-purple-600"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                                          clipRule="evenodd"></path>
                                    <path fillRule="evenodd"
                                          d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-slate-600 text-sm">Toplam Birikim</span>
                                <span className="font-bold text-slate-900 text-lg">₺ {info?.saving}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start items-center">
                            <button
                                className="border max-h-[44px] hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 border-slate-200 text-slate-700 py-2 px-4 gap-2 flex items-center text-sm justify-center rounded-xl shadow-sm hover:shadow-md font-medium"
                                onClick={() => setIsOpen(true)}>
                                <svg
                                    className="text-slate-600"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={16}
                                    height={16} viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M7 6c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                                          clipRule="evenodd"></path>
                                    <path fillRule="evenodd"
                                          d="M2 11c0-1.1.9-2 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                          clipRule="evenodd"></path>
                                    <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                                </svg>
                                Yeni Giris
                            </button>
                            <button
                                className="border max-h-[44px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-white py-2 px-4 text-sm flex items-center justify-center rounded-xl shadow-lg hover:shadow-xl font-medium"
                                onClick={() => setIsOpenEditBudget(true)}>
                                <svg className="mr-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                     width={20} height={20}>
                                    <path fillRule="evenodd"
                                          d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                                          clipRule="evenodd"></path>
                                    <path fillRule="evenodd"
                                          d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                                          clipRule="evenodd"></path>
                                </svg>
                                Duzenle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NewBudgetItem isOpen={isOpen} setIsOpen={setIsOpen} budgetItem={info} token={token}/>
            <EditBudget isOpen={isOpenEditBudget} setIsOpen={setIsOpenEditBudget} budgetInfo={info} token={token}
                        onSuccess={(updated) => setInfo(updated)}/>
        </>
    )
}