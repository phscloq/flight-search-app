
export async function GetData(){
    const url = 'https://barandogan.me/mock-data/mock-data.json?' + Date.now();
    const res = await fetch(`${url}`);
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    const data= await res.json();
    console.log(data.length);
    return data;
}