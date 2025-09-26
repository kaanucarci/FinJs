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
                    <BudgetItem budgetItem={expenses} token={token} />
                )}
                
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-200">
                        <button
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Onceki
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = i + 1;
                                } else if (pagination.page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = pagination.page - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => onPageChange(pageNum)}
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
                        </div>
                        
                        <button
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={pagination.page >= totalPages}
                            className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Sonraki
                        </button>
                        
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
