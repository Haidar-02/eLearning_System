import { useEffect, useState } from "react";
import { getTaskSubmissions } from "../../../../../../../helpers/common.helpers";
import SubmissionCard from "./SubmissionCard";
import Button from "../../../../../../Common/Button";

const Submissions = ({task_id,setShowSubmissions}) => {
    const [submissions,setSubmissions]=useState();
    useEffect(() => {
        const fetchSubmissions = async () => {
          const res = await getTaskSubmissions(task_id);
          setSubmissions(res);
        };
    
        fetchSubmissions();
      }, []);
    return ( 
        <>
            <div className="flex items-center justify-between">
                <div className="page-header gothic color-cyan-dark text-2xl py-5">
                    Task Submissions
                </div>
                <div className="button-container flex items-center rounded-full p-3 h-[20px] ">
                    <Button
                    onClick={() => setShowSubmissions({id:null,show:false})}
                    text="Back"
                    className="p-0 bg-cyan text-xl text-white"
                    />

                </div>
            </div>
            <div className="submissions">
            {
                submissions && submissions.map((submission)=>(
                    <SubmissionCard  key={submission.id} submission={submission} setSubmissions={setSubmissions} submissions={submissions}/>
                ))
            }
            </div>
        </>
    );
}
 
export default Submissions;