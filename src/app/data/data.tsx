
export async function GetData(){
    const url = 'https://phscloq.github.io/mock-data/mock-data.json?';
    const res = await fetch(`${url}`);
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    const data= await res.json();
   
    return data;
}