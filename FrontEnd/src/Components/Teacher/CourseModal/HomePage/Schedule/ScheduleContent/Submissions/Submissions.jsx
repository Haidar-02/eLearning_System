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
            <div className="flex items-center">
                <div className="page-header gothic color-cyan-dark text-2xl py-5">
                    Schedule Content
                </div>
                <div className="button-container flex items-center rounded-full p-3 w-[20px] h-[20px] ">
                    <Button
                    onClick={() => setShowSubmissions({id:null,show:false})}
                    text="Back"
                    className="p-0 bg-transparent text-xl text-black"
                    />

                </div>
            </div>
            <div className="submissions">
            {
                submissions && submissions.map((submission)=>(
                    <SubmissionCard  key={submission.id} submission={submission} setSubmissions={setSubmissions}/>
                ))
            }
            </div>
        </>
    );
}
 
export default Submissions;