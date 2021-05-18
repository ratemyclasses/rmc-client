export function SearchField() {
    return (
        <div>
            <div class="flex flex-col text-center w-full mb-10">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ANY COURSE. ANYWHERE.</h2>
                <h1 class="sm:text-3xl text-2xl font-bold title-font text-gray-900">Search for a course.</h1>
            </div>
            <div class=" relative ">
                
                <input type="text" id="rounded-email" class=" rounded-lg border-transparent flex-1 appearance-none border md:w-4/6 py-4 px-8 sm:w-full bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent" placeholder="Search course..." />
            </div>
        </div>
    )
}