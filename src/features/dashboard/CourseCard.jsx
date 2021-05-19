export function CourseCard() {
    return (

        <div class="bg-white  overflow-hidden shadow-sm rounded-lg w-full md:w-full relative py-4 px-4 mb-4">
            <div class="">
                <dl class="float-left py-2">

                    <dd class="text-md font-semibold text-gray-900">
                        CS 361
                    </dd>
                    <dt class="text-sm leading-5 text-gray-500 truncate">
                        Probability and Statistics
                    </dt>
                    {/* <dd class="text-gray-500 font-semibold">
                        <span>
                            Hongye Liu
                        </span>
                    </dd> */}
                </dl>
                <span class="rounded-xl px-4 py-4 bg-purple-200 float-right font-extrabold text-purple-800" >
                    4.5
                </span>
            </div>
        </div>
    )
}