
export default function BudgetItems(){
    return(
        <div className="max-w-7xl mx-auto p-6 flex flex-row justify-center items-center gap-5">
            <div className="w-full shadow-sm bg-white rounded p-4"> 
                <div className="flex justify-start gap-3">
                    <select className="!w-auto form-input" name="expense_type">
                        <option value="">Harcamalar - Birikimler</option>
                        <option value={1}>Sadece Harcamalar</option>
                        <option value={2}>Sadece Birikimler</option>
                    </select>
                </div>

                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Soyad</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-posta</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">Kaan</td>
                            <td class="px-6 py-4 whitespace-nowrap">Uçarcı</td>
                            <td class="px-6 py-4 whitespace-nowrap">kaan@example.com</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

             </div>
        </div>   
    )
}