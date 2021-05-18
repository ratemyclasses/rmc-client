import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColleges } from "../../app/actions/college.actions";
import { STATUS } from "../../app/constants";
import { UniversityCard } from "./UniversityCard";

export function Universities() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.college.status);
    const colleges = useSelector((state) => state.college.colleges);

    useEffect(() => {
        if (status === STATUS.idle) {
          dispatch(
            getColleges({
                params:["hello"]
            })
          );
        }
      });

    console.log(colleges);
    return (
        <div>
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-10">
                    <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">SUPPORTED UNIVERSITIES</h2>
                    <h1 class="sm:text-3xl text-2xl font-bold title-font text-gray-900">Explore Courses at Your School</h1>
                </div>
                <div class="flex flex-wrap -m-4">
                    {colleges.map(college => {
                        return <UniversityCard name={college.shortName} tag={college.tag} description={college.description}/>;
                    })}
                    
                </div>
            </div>
        </div>
    )
}