import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import LeaveTrackEmpl from "../Components/LeaveTrackEmpl";

const LeaveTracker = () => {
    return (
        <section className="frame">
            <Header />
            <div>
                <LeaveTrackEmpl />
            </div>
            <Footer />
        </section>
    );
};
    
export default LeaveTracker;