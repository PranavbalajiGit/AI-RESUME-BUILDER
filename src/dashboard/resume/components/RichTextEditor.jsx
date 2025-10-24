import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AImodel';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level). Give me result as HTML unordered list with <ul> and <li> tags.';

function RichTextEditor({onRichTextEditorChange , index , defaultValue}) {
    const[value , setValue] = useState();
    const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext);
    const [loading,setLoading]=useState(false);

    const GenerateSummeryFromAI = async() => {
        if(!resumeInfo.experience[index].title)
        {
            toast('Please Add Position Title');
            return ;
        }
        setLoading(true);
        
        try {
            const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
            console.log(prompt);
            
            const result = await AIChatSession.sendMessage(prompt);
            const responseText = result.response.text();
            console.log("Raw response:", responseText);
            
            const cleanedHtml = responseText
                .replace(/```html/g, '')  // Remove markdown code blocks if any
                .replace(/```/g, '')
                .replace(/\n\s*/g, '')  
                .trim();
        
            console.log("Final HTML:", cleanedHtml);
            setValue(cleanedHtml);
            
            // Trigger the change handler to update resume state
            onRichTextEditorChange({ target: { value: cleanedHtml } });

            
        } 
        catch (error) {
            console.error("Error generating summary:", error);
            toast("Error generating summary from AI");
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summary</label>
            <Button variant='outline' size='sm' onClick = {GenerateSummeryFromAI} disabled={loading} className='flex gap-2 border-primary text-primary'> 
                {loading? <LoaderCircle className='animate-spin'/>: 
                <> <Brain className='h-4 w-4'/> Generate from AI </>}
            </Button>
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e) => {
                setValue(e.target.value);
                onRichTextEditorChange(e)
            }}>
                <Toolbar>
                    <BtnBold/>
                    <BtnItalic/>
                    <BtnUnderline/>
                    <BtnStrikeThrough/>
                    <Separator/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                    <Separator/>
                    <BtnLink/>
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor