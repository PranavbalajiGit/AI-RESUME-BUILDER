import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AImodel";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = result.response.text();
      console.log("Raw response:", responseText);

      const parsed = JSON.parse(responseText);
      console.log("Parsed data:", parsed);
      console.log("Type of parsed:", typeof parsed);
      console.log("Is array:", Array.isArray(parsed));

      // Check different possible structures
      let summariesArray = [];

      if (Array.isArray(parsed)) {
        // If the response is directly an array
        summariesArray = parsed;
        console.log("Using direct array");
      } else if (parsed.summaries && Array.isArray(parsed.summaries)) {
        // If the response has a summaries property
        summariesArray = parsed.summaries;
        console.log("Using parsed.summaries");
      } else if (parsed.summary && Array.isArray(parsed.summary)) {
        // If the response has a summary property (singular)
        summariesArray = parsed.summary;
        console.log("Using parsed.summary");
      } else {
        // Try to find any array property
        for (const [key, value] of Object.entries(parsed)) {
          if (Array.isArray(value)) {
            summariesArray = value;
            console.log(`Using parsed.${key}`);
            break;
          }
        }
      }

      console.log("Final summariesArray:", summariesArray);
      console.log("Length of summariesArray:", summariesArray.length);

      // Set the AI generated summaries to display on the webpage
      setAiGeneratedSummeryList(summariesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast("Error generating summary from AI");
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="fonr-bold text-lg"> Summary</h2>
        <p> Add Summary for your Job Title </p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between">
            <label> Add Summary </label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              onClick={() => GenerateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" /> Generate from AI{" "}
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery || ""} // Add this line to bind the state to textarea
            onChange={(e) => setSummery(e.target.value)}
            placeholder="Enter your summary here or click on AI suggestions below..."
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList?.length > 0 &&
        aiGeneratedSummeryList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSummery(item?.summary)}
            className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
          >
            <h2 className="font-bold my-1 text-primary">
              Level: {item?.experience_level}
            </h2>
            <p>{item?.summary}</p>
          </div>
        ))}
    </div>
  );
}

export default Summery;
