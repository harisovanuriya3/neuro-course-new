import StudyCalendar from "../../components/StudyCalendar";
export default async function CalendarPage({searchParams}:{searchParams:Promise<{lang?:string}>}) {
 const params=await searchParams;
 const language=params.lang==="EN"?"EN":params.lang==="KZ"?"KZ":"RU";
 return <StudyCalendar language={language}/>;
}
