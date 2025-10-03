import BudgetItem from "./BudgetItem";
import EmptyState from "./EmptyState";


export default function BudgetItems({budgetItems , token, pagination, onPageChange}) {

    const data = Array.isArray(budgetItems) ? budgetItems[0] : budgetItems;
    const expenses = data?.expenses || [];

    const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
    
    return (
    <div className="max-w-7xl mx-auto lg:p-6 p-2 flex flex-row justify-center items-center gap-5">
        <div className="w-full shadow-modern-lg bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
            <div className="flex items-start justify-center flex-col w-full">
                {expenses.length === 0 ? (
                    <EmptyState />
                ) : (
                    <BudgetItem 
                        budgetItem={expenses} 
                        token={token} 
                    />
                )}
                
                {totalPages > 1 && (
                    <div className="flex items-center flex-col lg:flex-row justify-center gap-3 mt-6 pt-4 w-full border-t border-slate-200">
                        <div className="flex items-center gap-2 ">
                            <button
                                onClick={() => {
                                    console.log('Onceki button clicked, current page:', pagination.page);
                                    onPageChange(pagination.page - 1);
                                }}
                                disabled={pagination.page <= 1}
                                className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Onceki
                            </button>
                            
                        <div className="flex items-center gap-1">
                            {/* Ilk sayfa butonu - her zaman gorunur */}
                            <button
                                onClick={() => {
                                    console.log('First page button clicked, page: 1');
                                    onPageChange(1);
                                }}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    pagination.page === 1
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                                1
                            </button>

                            {/* uc nokta - sadece gerekli oldugunda */}
                            {pagination.page > 4 && (
                                <span className="px-2 text-slate-500">...</span>
                            )}

                            {/* Orta sayfa butonlari */}
                            {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    // 5 sayfa veya daha azsa, 2'den basla (1 zaten var)
                                    pageNum = i + 2;
                                } else if (pagination.page <= 3) {
                                    // Ilk sayfalardaysa, 2-4 arasi goster
                                    pageNum = i + 2;
                                } else if (pagination.page >= totalPages - 2) {
                                    // Son sayfalardaysa, son 3 sayfayi goster
                                    pageNum = totalPages - 2 + i;
                                } else {
                                    // Ortadaysa, mevcut sayfanin etrafindaki sayfalari goster
                                    pageNum = pagination.page - 1 + i;
                                }
                                
                                // Ilk ve son sayfayi atla (onlar zaten ayri butonlarda)
                                if (pageNum <= 1 || pageNum >= totalPages) return null;
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => {
                                            console.log('Page button clicked, page:', pageNum);
                                            onPageChange(pageNum);
                                        }}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                            pagination.page === pageNum
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* uc nokta - sadece gerekli oldugunda */}
                            {pagination.page < totalPages - 3 && totalPages > 5 && (
                                <span className="px-2 text-slate-500">...</span>
                            )}

                            {/* Son sayfa butonu - 1'den fazla sayfa varsa gorunur */}
                            {totalPages > 1 && (
                                <button
                                    onClick={() => {
                                        console.log('Last page button clicked, page:', totalPages);
                                        onPageChange(totalPages);
                                    }}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        pagination.page === totalPages
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>
                            
                            <button
                                onClick={() => {
                                    console.log('Sonraki button clicked, current page:', pagination.page);
                                    onPageChange(pagination.page + 1);
                                }}
                                disabled={pagination.page >= totalPages}
                                className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Sonraki
                            </button>
                        </div>
                        <div className="ml-4 text-sm text-slate-600">
                            Sayfa {pagination.page} / {totalPages} ({pagination.totalCount} toplam)
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
