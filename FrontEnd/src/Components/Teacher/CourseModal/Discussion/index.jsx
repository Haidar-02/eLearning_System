import { useEffect, useState } from "react";
import { addCourseDiscussion, getCourseDiscussion } from "../../../../helpers/common.helpers";
import TextArea from "../../../Inputs/TextArea";
import Button from "../../../Common/Button";

const DiscussionBoard = ({course_id}) => {
    const [discussions,setDiscussions]=useState();
    const [messageSend,setMessageSend]=useState("");
    function inputHandler(e) {
        const { value } = e.target;
        setMessageSend(value);
    }
  useEffect(() => {
    const fetchDiscussion = async () => {
      const res = await getCourseDiscussion(course_id);
      setDiscussions(res.message);
    };

    fetchDiscussion();

  }, []);

  async function handleAdd() {
    const { data } = await addCourseDiscussion(messageSend,course_id);
    if(data){
        let myName=localStorage.getItem('name');
        setDiscussions((prev)=> [...prev,{message:messageSend,user:{name:myName}}]);
        console.log(discussions);
        setMessageSend("");
    }

  }
    return ( 
        <div className="">
        <div className="flex justify-between items-center">
          <div className="page-header gothic color-cyan-dark text-2xl py-5">
            Dicussion Board
          </div>
        </div>
        <div className="message-container bg-cyan-light border border-solid rounded-sm">
        <ul className=" overflow-y-scroll h-[400px]">
        {discussions &&
            discussions.map((discussion, index) => (
                <li key={index}>
                <h6 >{discussion.user.name}</h6>
                <p>{discussion.message}</p>
                </li>
          ))}
        </ul>
        <div className=" flex-row">
        <TextArea name="message" value={messageSend} placeholder="Enter Message" onChange={inputHandler}/>
        <Button
          text="Send"
          className=" text-[16px] bg-green text-white p-3 self-end"
          onClick={() => {
            handleAdd();
          }}
        />
        <Button
          text="Clear"
          onClick={() => {
            setMessageSend("");
          }}
          className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
        />
        </div>

        </div>


      </div>
     );
}
 
export default DiscussionBoard;