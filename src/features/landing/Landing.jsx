import CenteredContent from "../../common/layout/CenteredContent";
import { Navbar } from "../../common/Navbar";
import { LandingContents } from "./LandingContents";


export function Landing() {
    return (
        <div>
            <Navbar />
            <CenteredContent centeredComponent={<LandingContents />} />
        </div>)
}
