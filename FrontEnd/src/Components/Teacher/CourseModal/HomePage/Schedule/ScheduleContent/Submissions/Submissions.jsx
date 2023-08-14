import { useEffect, useState } from "react";
import { getTaskSubmissions } from "../../../../../../../helpers/common.helpers";

const Submissions = ({task_id}) => {
    const [submissions,setSubmissions]=useState();
    useEffect(() => {
        const fetchSubmissions = async () => {
          const res = await getTaskSubmissions(task_id);
          setSubmissions(res);
          console.log(res);
        };
    
        fetchSubmissions();
      }, []);
    return ( <h1>{task_id}</h1> );
}
 
export default Submissions;