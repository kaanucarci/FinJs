

export default function Footer(){
    return(
        <div className="bg-[#fff] border-t border-[#e5e7eb] mt-auto safe-area-bottom">
        <div className="max-w-4xl mx-auto p-6 flex flex-row lg:justify-center lg:items-center gap-5 overflow-auto">
          <span className="text-xs text-[#8a8a8a]">
            © {new Date().getFullYear()} FinJS. All rights reserved.
          </span>
        </div>
      </div>
    )
}