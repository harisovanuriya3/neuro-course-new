export function isMeaningfulResponse(value:string,minChars=12,minWords=3):boolean{
  const normalized=value.trim().toLowerCase().replace(/\s+/g," ");
  if(normalized.length<minChars)return false;
  const letters=[...normalized].filter(ch=>/\p{L}/u.test(ch));
  if(letters.length<Math.max(6,Math.floor(minChars/2)))return false;
  const uniqueLetters=new Set(letters);
  if(uniqueLetters.size<4)return false;
  const words=normalized.match(/[\p{L}\p{N}]+/gu)??[];
  if(words.length<minWords)return false;
  const uniqueWords=new Set(words);
  if(uniqueWords.size<Math.min(minWords,3))return false;
  const longestRun=(normalized.match(/(.)\1{5,}/gu)??[]).some(run=>run.length>=6);
  if(longestRun)return false;
  const dominant=[...uniqueWords].some(w=>words.filter(x=>x===w).length/words.length>0.6);
  return !dominant;
}
