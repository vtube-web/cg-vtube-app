export default function FormatDateUpdate  (date){
    let temp= date.slice(0,10).split("-").reverse();
    temp =[...temp.slice(0,1)," mt ",...temp.slice(1,2)," , ",...temp.slice(2)]
    return temp;
}