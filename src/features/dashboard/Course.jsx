import { IndividualRatings } from "./IndividualRatings";
import { OverallRating } from "./OverallRating";

export function Course() {
    return (
        <div class="lg:flex lg:items-center lg:justify-between mt-12 bg-white rounded-lg px-10 py-10">
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-2 ...">
                    <div class="flex-1 min-w-0">
                        <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            CS 361
                        </h2>
                        <h2 class="text-xl font-bold leading-5 text-gray-900 sm:text-3xl sm:truncate mb-2 ">
                            Probability and Statistics
                        </h2>
                        <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                        Full-time
                    </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 ...">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="...">
                            <OverallRating />
                        </div>
                        <div class="...">
                            <IndividualRatings />
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}